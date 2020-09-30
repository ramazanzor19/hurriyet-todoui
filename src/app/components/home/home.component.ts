import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


import { NoteService } from '../../service/note.service';
import { AuthenticationService } from '../../service/authentication.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  notes = [];
  newNote: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private noteService: NoteService,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.newNote = this.formBuilder.group({
      text: ['', Validators.required],
    });

    this.noteService.getUserNotes()
      .subscribe(
        data => {
            this.notes = data;
        });
  }

  get f() { return this.newNote.controls; }

  remove(id): void {
    this.noteService.deleteUserNote(id)
      .subscribe(
        data => {
          this.notes = this.notes.filter(note => note.id !== id);
        }
      );
  }

  save() {
    if (this.newNote.invalid) {
        this.error = 'Text value must be provided';
        return;
    }
    this.noteService.saveNote({ text: this.f.text.value })
      .subscribe(
        data => {
          this.notes.push(data);
          this.error = '';
          this.newNote.reset();
        }
      )
  }

  logout() {
      this.authenticationService.logout();
  }

}
