import { Category } from "src/app/shared/models/category.model"
import { User } from "src/app/usuario/models/user.model"

export interface Bug{
    id?: number,
    title: string,
    code: string,
    createdAt: Date,
    description: string,
    categories: Category[],
    user: User
}