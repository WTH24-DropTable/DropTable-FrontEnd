export interface User {
    id: string,
    name: string,
    role: 'lecturer' | 'student' | 'admin',
    classes: string[],
    profilePicUrl: string
}

export interface CreateUser {
    name: string,
    role: 'lecturer' | 'student',
    profilePicUrl: string
}