export type UserInput = {
    username: string;
    name: string;
    email: string;
    password: string;
    photo?: string;
    description?: string;
}

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};