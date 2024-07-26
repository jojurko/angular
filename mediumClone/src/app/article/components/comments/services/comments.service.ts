import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environment/environment";
import { CommentInterface } from "../types/comment.interface";
import { map, Observable } from "rxjs";
import { GetCommentsInterface } from "../types/getcomments.interface";
import { GetNewCommentInterface } from "../types/getNewComment.interface";
import { NewCommentInterface } from "../types/newComment.interface";

@Injectable()
export class CommentsService {
    constructor(private http: HttpClient) {}

    fetchComments(slug: string): Observable<CommentInterface[]> {
        const url: string = `${environment.apiUrl}/articles/${slug}/comments`
        return this.http.get<GetCommentsInterface>(url)
        .pipe(map((response)=>response.comments))
    }

    postComment(slug: string, comment: NewCommentInterface): Observable<CommentInterface> {
        const url: string = `${environment.apiUrl}/articles/${slug}/comments`
        console.log(url)
        return this.http.post<GetNewCommentInterface>(url, comment).pipe(map(response=>response.comment))
    }

    deleteComment(slug: string, id: number):Observable<{}> {
        const url: string = `${environment.apiUrl}/articles/${slug}/comments/${id}`
        console.log(url);
        return this.http.delete(url)
    }
}