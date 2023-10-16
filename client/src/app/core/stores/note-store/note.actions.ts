import { createAction, props } from "@ngrx/store";

import { Note } from "../../models/note.model";

export const init = createAction(
  '[Note] Init'
);

export const set = createAction(
  '[Note] Set',
  props<{value: Note[]}>()
);

export const addNote = createAction(
  '[Note] Add',
  props<{value: Note}>()
);

export const addedNoteSuccess = createAction(
  '[Note] AddSuccess',
  props<{value: Note}>()
);

export const addedNoteFailure = createAction(
  '[Note] AddFailure',
  props<{error: string}>()
);

export const editNote = createAction(
  '[Note] Edit',
  props<{value: Note}>()
);

export const editNoteSuccess = createAction(
  '[Note] EditSuccess',
  props<{value: Note}>()
);

export const removeNote = createAction(
  '[Note] Remove',
  props<{id: number}>()
);

export const removeNoteSuccess = createAction(
  '[Note] RemoveSuccess',
  props<{id: number}>()
);
