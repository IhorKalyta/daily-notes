import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';

import { Note } from '../../core/models/note.model';
import { addNote, editNote } from '../../core/stores/note-store/note.actions';

@Component({
  selector: 'app-modal-create-note',
  templateUrl: './modal-create-note.component.html',
  styleUrls: ['./modal-create-note.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class ModalCreateNoteComponent {
  note: Note = new Note();

  constructor(
    private store: Store
  ) { }

  onSubmit() {
    this.note.id ?
      this.store.dispatch(editNote({ value: this.note })) :
      this.store.dispatch(addNote({ value: this.note }));
  }
}
