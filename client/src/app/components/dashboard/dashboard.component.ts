import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppConstants } from '../../app.constants';
import { NoteComponent } from '../note/note.component';
import { Note } from '../../core/models/note.model';
import { ModalCreateNoteComponent } from '../modal-create-note/modal-create-note.component';
import { init } from '../../core/stores/note-store/note.actions';
import { NoteFilterPipe } from '../../core/pipes/note-filter.pipe';
import { notesFeature } from '../../core/stores/note-store/note.state';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NoteComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatToolbarModule,
    MatProgressBarModule,
    NoteFilterPipe,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  notes$: Observable<Note[]>;
  isLoading$: Observable<boolean>;
  notesFilter: string = '';

  constructor(
    private store: Store,
    private dialogRef: MatDialog
  ) {
    this.store.dispatch(init());
    this.notes$ = store.select(notesFeature.selectNotes);
    this.isLoading$ = store.select(notesFeature.selectIsLoading);
  }

  addNewNote() {
    this.dialogRef.open(
      ModalCreateNoteComponent, {
        minWidth: AppConstants.MODAL_WINDOW_SIZE,
        disableClose: true
      }
    );
  }
}
