import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppConstants } from '../../app.constants';
import { ModalCreateNoteComponent } from '../modal-create-note/modal-create-note.component';
import { removeNote } from '../../core/stores/note-store/note.actions';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})

export class NoteComponent {
  @Input() note: any;

  constructor(
    private store: Store,
    private dialogRef: MatDialog
  ) {}

  delete(id: number) {
    this.store.dispatch(removeNote({id: id}));
  }

  edit() {
    const dialogRef = this.dialogRef.open(
      ModalCreateNoteComponent, {
        minWidth: AppConstants.MODAL_WINDOW_SIZE
      }
    );
    dialogRef.componentInstance.note = {...this.note};
  }
}
