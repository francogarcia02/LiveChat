import crypto from 'node:crypto'

export class ConversationRepository {
    static async create ({user1, user2, db}) {
        let user1_id
        let user1_result

        let user2_id
        let user2_result

        try {
            user1_result = await db.execute({
                sql: `
                    SELECT * FROM users WHERE username = ?;
                `,
                args: [user1]
            });
        } catch (error) {
            console.error('Error ejecutando la consulta user1:', error);
            throw new Error('Error al conectarse a la base de datos.');
        }

        try {
            user2_result = await db.execute({
                sql: `
                    SELECT * FROM users WHERE username = ?;
                `,
                args: [user2]
            });
        } catch (error) {
            console.error('Error ejecutando la consulta user2:', error);
            throw new Error('Error al conectarse a la base de datos.');
        }
        
        if (user1_result.rows.length === 0) {
            throw new Error('Usuario1 no encontrado');
        } else{
            user1_id = user1_result.rows[0]
        }
        
        if (user2_result.rows.length === 0) {
            throw new Error('Usuario2 no encontrado');
        } else{
            user2_id = user2_result.rows[0]
        }

        const id = crypto.randomUUID()

        try {
            const result = await db.execute({
                sql: `
                    INSERT INTO conversations (id, user1_id, user2_id) 
                    VALUES (?, ?, ?);
                `,
                args: [id, user1_id.id, user2_id.id]
            });
            console.log(result)
        } catch (error) {   
            return console.error('Error registrando la conversacion: ', error)
        }
        return id
    }

}