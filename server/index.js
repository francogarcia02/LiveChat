import express from 'express'
import logger from 'morgan'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'
import { PORT, SECRET_SWT_KEY } from './config.js'
import { UserRepository } from './user-repository.js'
import { corsMiddleWare } from './middlewares/CorsMiddleware.js'
import cors from 'cors'

import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: "*",
    }
})

const db = createClient({
    url: 'libsql://live-chat-fran02fcg.turso.io',
    authToken: process.env.DB_TOKEN
})

// Crear tablas

await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );   
`)

await db.execute(`
    CREATE TABLE IF NOT EXISTS conversations (
    id TEXT PRIMARY KEY,
    user1_id BINARY(16) NOT NULL,
    user2_id BINARY(16) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user1_id, user2_id),
    FOREIGN KEY (user1_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user2_id) REFERENCES users(id) ON DELETE CASCADE
);    
`)


await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    username TEXT NOT NULL
);
`)


io.on('connection', async (socket) => {
    socket.on('chat message', async (message) => {
        const {msg, username} = message
        console.log(message)
        let result
        try {
            result = await db.execute({
                sql: `INSERT INTO messages (content, username) VALUES (?, ?)`,
                args: [msg, username]
            })
        } catch (error) {
            console.error(error)
            return
        }
        io.emit('chat message', msg, result.lastInsertRowid.toString(), username)
    })

    if (!socket.recovered) {
        try {
            const result = await db.execute({
                sql: `SELECT * FROM messages WHERE id > ?`,
                args: [socket.handshake.auth.serverOffset ?? 0]
            })

            result.rows.forEach(row => {
                socket.emit('chat message', row.content, row.id.toString(), row.username)
            })
        } catch (error) {
            console.error(error)
        }
    }

    socket.on('disconnect', () => {
        console.log('A user has disconnected!')
    })
})

//MiddelWares
app.use(express.json());

app.use(cookieParser())
app.use(cors({ origin: '*' }));


app.use((req, res, next) => {
    const token = req.cookies.access_token;

    req.session = req.session || { user: null };

    if (!token) {
        console.log("No se encontró la cookie 'access_token'");
        return next();
    }

    try {
        const data = jwt.verify(token, SECRET_SWT_KEY);
        req.session.user = data;
        console.log("Token verificado:", data);
    } catch (error) {
        console.error("Error al verificar el token:", error.message);
        req.session.user = null;
    }

    next();
});


app.post('/login', async (req, res) => {
    const {username, password} = req.body
    try {
        const result = await UserRepository.login({username, password, db})
        const token = jwt.sign(
            {
                id: result._id, 
                username: result.username
            }, 
            SECRET_SWT_KEY,
            {
                expiresIn: '1h'
            }
        )
        res
        .cookie('access_token',token,{
            httpOnly: true,
            secure: process.eventNames.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60  * 60
        })
        .json({
            message: 'Login successfull',
            user: { id: result._id, username: result.username }
        });
    } catch (error) {
        console.error('Error en el login:', error);
        
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        } else if (error.message === 'Contraseña incorrecta') {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        } else {
            return res.status(500).json({ message: 'Error en el servidor' });
        }
    }

})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await UserRepository.create({ username, password, db });
        return res.json({
            message: 'Register successfull',
            user: { id: result._id, username: result.username }
        });
    } catch (error) {
        return res.status(500).json({'Dentro del catch: ': error });
    }
});

app.post('/logout', (req, res) => {
    res
    .clearCookie('access_token')
    .redirect('/')
})


app.get('/getData', (req, res) => {
    const {user} = req.session

    if(!user){
        return res.status(403).json({Error : 'Access Denied'})
    }
    res.json(user);
})

app.use(logger('dev'))

server.listen(PORT, () => {
    console.log('Aplicación corriendo en el puerto: ', PORT)
})
