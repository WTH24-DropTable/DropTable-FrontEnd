export interface User {
    id: string,
    name: string,
    course: string,
    email: string,
    password: string,
    role: 'lecturer' | 'student' | 'admin',
    classes: string[],
    profilePic: string,
    isNew: boolean,
}

export interface CreateUser {
    name: string,
    role: 'lecturer' | 'student',
    profilePicUrl: string
}