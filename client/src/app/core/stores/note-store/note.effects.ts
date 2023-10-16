import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, map, of, switchMap } from "rxjs";

import { AppConstants } from "../../../app.constants";
import { NotesService } from "../../services/notes.service";
import * as NoteActions from './note.actions';

@Injectable()
export class NoteEffects {

  constructor(
    private actions$: Actions,
    private notesService: NotesService
  ) {}

  loadNotes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NoteActions.init),
        switchMap(() => this.notesService.getNotes()
          .pipe(
            delay(AppConstants.ONE_SECOND),
            map(({ data }) => {
              if (data) {
                return NoteActions.set({value: data.notes});
              }
              return NoteActions.set({value: []});
            })
          )
        )
      )
  );

  saveNote = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NoteActions.addNote),
        switchMap((action) => this.notesService.addNote(action.value.title!, action.value.description!)
          .pipe(
            map(({ data }) =>
              NoteActions.addedNoteSuccess({ value: data?.addNote! })
            ),
            catchError((error: HttpErrorResponse) =>
              of(NoteActions.addedNoteFailure({ error: error.message }))
            )
          )
        )
  ));

  updateNote = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NoteActions.editNote),
        switchMap((action) => this.notesService.updateNote(action.value.id!, action.value.title!, action.value.description!)
          .pipe(
            map(({ data }) => NoteActions.editNoteSuccess({ value: data?.updateNote! }))
          )
        )
  ));

  deleteNote = createEffect(
    () =>
      this.actions$.pipe(
        ofType(NoteActions.removeNote),
        switchMap((action) => this.notesService.deleteNote(action.id)
          .pipe(
            map(({ data }) => NoteActions.removeNoteSuccess({id: data?.deleteNote.id!})),
          )
        )
  ));
}
