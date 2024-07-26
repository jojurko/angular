import { CommentInterface } from "./comment.interface";
import { BackendErrorsInterface } from "src/app/shared/types/backendErrors.interface";

export interface CommentsStateInterface {
    isLoading: boolean
    error: BackendErrorsInterface | null
    data: CommentInterface[]
}