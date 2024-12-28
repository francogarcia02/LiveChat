import crypto from 'node:crypto'
import { getUsersId } from '../utils/getUsersIds.js';

export class ConversationRepository {
    static async create ({user1, user2, db}) {
        const result = await getUsersId({user1, user2, db})
        
        if(result.error){
            return result
        }

        const user1_id = result.user1_id
        const user2_id = result.user2_id

        const id = crypto.randomUUID()
        let response
        try {
            const result = await db.execute({
                sql: `
                    INSERT INTO conversations (id, user1_id, user2_id) 
                    VALUES (?, ?, ?);
                `,
                args: [id, user1_id.id, user2_id.id]
            });
            response = result
        } catch (error) {   
            return {error: 'Error creando la conversacion', error}
        }
        return response
    }
    static async delete ({user1, user2, db}) {
        const ids = await getUsersId({user1, user2, db})

        if(ids.error){
            return ids
        }

        const user1_id = ids.user1_id.id
        const user2_id = ids.user2_id.id

        let conversation
        try {
            const result = await db.execute({
                sql: `
                    SELECT *
                    FROM conversations
                    WHERE 
                        (user1_id = ? AND user2_id = ?) OR 
                        (user1_id = ? AND user2_id = ?)`,
                args: [user1_id, user2_id, user2_id, user1_id]
            });
            conversation = result.rows[0]
        } catch (error) {   
            return {error: 'Error buscando la conversacion', error}
        }
        if (!conversation) {
            const error = 'Conversacion no encontrada'
            return {error: error}
        }
        
        const conversation_id = conversation.id

        try {
            await db.execute({
                sql: `DELETE FROM messages WHERE conversation_id = ?`,
                args: [conversation_id]
            });
        } catch (error) {   
            return {error: 'Error eliminando los mensajes de la conversacion', error}
        }

        let result
        try {
            result = await db.execute({
                sql: `DELETE FROM conversations WHERE id = ?`,
                args: [conversation_id]
            });
        } catch (error) {   
            return {error: 'Error eliminando la conversacion', error}
        }
        return result
    }
}