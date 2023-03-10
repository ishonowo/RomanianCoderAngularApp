import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notebook } from '../notes/model/notebook';
import { Note } from '../notes/model/note';
import { FeedbackInfo } from '../feedback/feedback.component';

@Injectable({
    providedIn: 'root'
})

export class ApiService{
    private BASE_URL=window["cfgApiBaseUrl"]+"/api";
    public ALL_NOTEBOOKS_URL=`${this.BASE_URL}\\notebooks\\all`;
    private SEND_FEEDBACK_URL=`${this.BASE_URL}\\feedback`;
    private SAVE_UPDATED_NOTEBOOK=`${this.BASE_URL}\\notebooks`;
    private DELETE_NOTEBOOK_URL=`${this.BASE_URL}\\notebooks\\`;
    private ALL_NOTES_URL=`${this.BASE_URL}\\notes\\all`;
    private NOTES_BY_NOTEID_URL=`${this.BASE_URL}\\notes\\byId\\`;
    private NOTES_BY_NOTEBOOK_URL=`${this.BASE_URL}\\notes\\byNotebook\\`;
    private DELETE_NOTE_URL=`${this.BASE_URL}\\notes\\`;
    private SAVE_UPDATED_NOTE=`${this.BASE_URL}\\notes`;


    constructor(private http: HttpClient){
    }

    getAllNotes(): Observable<Note[]>{
        return this.http.get<Note[]>(this.ALL_NOTES_URL);
    }

    getNotesByNotebook(notebookId: string):Observable<Note[]>{
        return this.http.get<Note[]>(this.NOTES_BY_NOTEBOOK_URL + notebookId);
    }

    getNotesById(id:string): Observable<Note>{
        return this.http.get<Note>(this.NOTES_BY_NOTEID_URL + id);
    }

    getAllNotebooks(): Observable<Notebook[]>{
        return this.http.get<Notebook[]>(this.ALL_NOTEBOOKS_URL);          
    }

    postFeedback(feedback: FeedbackInfo):Observable<any>{
        return this.http.post(this.SEND_FEEDBACK_URL, feedback);
    }

    postNotebook(notebook:Notebook):Observable<Notebook>{
        return this.http.post<Notebook>(this.SAVE_UPDATED_NOTEBOOK, notebook);
    }

    postNote(note:Note):Observable<Note>{
        return this.http.post<Note>(this.SAVE_UPDATED_NOTE, note);
    }

    deleteNotebook(id:string):Observable<any>{
        return this.http.delete(this.DELETE_NOTEBOOK_URL+ id);
    }

    deleteNote(id:string):Observable<any>{
        return this.http.delete(this.DELETE_NOTE_URL+ id);
    }

}