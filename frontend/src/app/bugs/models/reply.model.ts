import { User } from "src/app/usuario/models/user.model";

export interface Reply{
    id?: number,
    description: string,
    code: string,
    createdAt: Date,
    bestAnswer: boolean,
    user: User
}