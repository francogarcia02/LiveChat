import express from 'express'
import logger from 'morgan'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'
import { corsMiddleWare } from './middlewares/CorsMiddleware.js'

dotenv.config()
const app = express()
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {}
})

//MiddelWares
app.use(express.json());
app.use(corsMiddleWare())

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
    conversation_id BINARY(16) NOT NULL,
    sender_id BINARY(16) NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);
`)

io.on('connection', async (socket) => {
    socket.on('chat message', async (msg) => {
        const username = socket.handshake.auth.username ?? 'anonymous'
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

app.post('/login', async (req, res) => {
    const { username, password } = req.body
    
    try {
        const result = await UserRepository.login({username, password, db})
        res.json({result})
    } catch (error) {
        res.status(500).json({"Error en el catch": error})
    }
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await UserRepository.create({ username, password, db });
        return res.json({'Dentro del try: ': result }); 
    } catch (error) {
        return res.status(500).json({'Dentro del catch: ': error });
    }
});

app.post('/logOut', (req, res) => {})

app.use(logger('dev'))

server.listen(PORT, () => {
    console.log('Aplicación corriendo en el puerto: ', PORT)
})
