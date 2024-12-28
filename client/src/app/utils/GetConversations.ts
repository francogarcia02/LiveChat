// Tipo para una conversación
interface Conversation {
    id: string;
    username1: string;
    username2: string;
}

// Tipo para la respuesta completa del servidor
interface GetConversationsResponse {
    message: string;
    result: Conversation[];
}


async function getConversations(username: string): Promise<GetConversationsResponse> {    
    const response = await fetch('http://localhost:4000/get-conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
    });

    if (!response.ok) {
        throw new Error('Error fetching conversations');
    }

    const data: GetConversationsResponse = await response.json();
    return data;
}

export default getConversations;
