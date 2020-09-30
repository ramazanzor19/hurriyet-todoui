import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Note } from '../models/note.model';
import { environment } from '../../environments/environment';
import { from } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient
  ) { }

  getUserNotes() {
    return this.http.get<Note[]>(`${environment.apiUrl}/notes/user-notes`);    
  }

  deleteUserNote(id) {
    return this.http.post<string>(`${environment.apiUrl}/notes/delete`, { id });
  }

  saveNote(note) {
    return this.http.post<Note>(`${environment.apiUrl}/notes/save`, note);
  }
}
