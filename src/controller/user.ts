import config from '../services/config'

export const findOne = ({ username }: Record<string, string>): Promise<UserType> => {
    return new Promise(resolve => resolve(userList.find(user => user.username === username)))
}

export const findById = (id: string): Promise<UserType> => {
    return new Promise(resolve => resolve(userList.find(user => user.id === id)))
}

export type UserType = {
    id: string
    username: string
    hash: string
}

const userList: UserType[] = [
    {
        id: '0',
        username: 'admin',
        hash: config.get('testuserpassword'),
    },
    {
        id: '1',
        username: 'user',
        hash: config.get('testuserpassword'),
    },
]
