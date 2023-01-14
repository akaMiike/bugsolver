import { Category } from "src/app/shared/models/category.model"
import { User } from "src/app/usuario/models/user.model"

export interface Bug{
    id?: number
    title: string,
    code: string,
    description: string,
    tags: Category[],
    user: User
}