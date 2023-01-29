import { User } from "src/app/usuario/models/user.model";

export interface Reply{
    id?: number,
    description: string,
    code: string,
    created_at: Date,
    best_answer: boolean,
    user: User
}