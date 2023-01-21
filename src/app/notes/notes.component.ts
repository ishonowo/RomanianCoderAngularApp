import { Component, OnInit } from '@angular/core';
import { Notebook } from './model/notebook';
import { Note } from './model/note';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notebooks: Notebook[]=[];
  notes: Note[]=[];
  selectedNotebook: Notebook;
  searchText: string;


  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
  }

  getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      res=>{
        this.notes=res;
        alert("All notes fetched.");
      },
      err=>{ alert("An error has occured fetching notes.")}
    );
  }


  public getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(
      res => {  
        this.notebooks=res;        
        alert("All notebooks fetched.");
      },
      err => { alert("An error has occured fetching notebooks.")}
    );    
  }


  createNotebook(){
    let newNotebook:Notebook={
      name:'New notebook', id:null, nbOfNotes:0
    }
    this.apiService.postNotebook(newNotebook).subscribe(
      res=> {
        newNotebook.id=res.id;
        this.notebooks.push(newNotebook);
        alert("Saved notebook successfully.");
      },
      err=> {alert("Saving notebook failed.")}
    );
  }

  createNote(notebook:Notebook){
    let newNote:Note={
      id:null,
      title:"New title",
      text:"Hello baby boy.",
      notebook:notebook,
      lastModifiedOn:"2019-08-02 00:00:00.000"
    };
    this.apiService.postNote(newNote).subscribe(
      res=>{
        newNote.id=res.id;
        this.notes.push(newNote);
        alert("Saved note successfully.");
      },
      err=>{alert("Saving note failed.")}
    );
  }

  updateNotebook(updatedNotebook:Notebook){
    this.apiService.postNotebook(updatedNotebook).subscribe(
      res=> {
        alert("Updated notebook successfully.");
      },
      err=> {alert("Updating notebook failed.")}
    );
  }

  updateNote(note:Note){
    this.apiService.postNote(note).subscribe(
      res=>{
        alert("Updated note successfully.")
      },
      err=>{
        alert("Updating note failed.")
      }
    );
  }

  deleteNotebook(notebook:Notebook){
    if(confirm("Confirm that you will like to delete this notebook.")){
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res=>{
          let indexOfNotebook= this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook,1);
          alert("The notebook has been deleted.");
        },
        err=>{alert("Deleting the notebook failed.")}
      )
    };
  }

  deleteNote(note:Note){
    if(confirm("Confirm that you will like to delete this note.")){
      this.apiService.deleteNote(note.id).subscribe(
        res=>{
          let indexOfNote= this.notes.indexOf(note);
          this.notes.splice(indexOfNote,1);
          alert("The note has been deleted.");
        },
        err=>{alert("Deleting the note failed.")}
      );
    }
  }

  selectNotebook(notebook:Notebook){
    this.selectedNotebook=notebook;
    this.apiService.getNotesByNotebook(notebook.id).subscribe(
      res=>{
        this.notes=res;
        alert("The notes for this notebook were successfully retreived.");
      },
      err=>{alert("Getting notes for this notebook failed.")}
    );
  }

  selectAllNotes(){
    this.selectedNotebook=null;
    this.getAllNotes();
  }
}
