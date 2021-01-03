export const findOne = ({ login }: Record<string, string>): Promise<UserType> => {
    return new Promise(resolve => resolve(userList.find(user => user.login === login)))
}

export const findById = (id: string): Promise<UserType> => {
    return new Promise(resolve => resolve(userList.find(user => user.id === id)))
}

export type UserType = {
    id: string
    login: string
    hash: string
}

const userList: UserType[] = [
    {
        id: '0',
        login: 'admin',
        hash: '',
    },
    {
        id: '1',
        login: 'user',
        hash: '',
    },
]
