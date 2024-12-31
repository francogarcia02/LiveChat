interface User {
    id: string | undefined,
    username: string | undefined
}

interface UserState {
    id: string | undefined,
    username: string | undefined
}

type UserAction = 
    | { type: 'setUser', payload: User }


export const userReducer = ( state: UserState, action: UserAction ): UserState => {

    switch ( action.type ) {
        case 'setUser': 
            return action.payload

            
        default:
            return state;
    }

}