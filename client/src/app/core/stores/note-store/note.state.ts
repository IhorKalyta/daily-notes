import { createFeature, createReducer, on } from "@ngrx/store";

import { IState } from "../../interfaces/state.interface";
import * as NoteActions from './note.actions';

export const notesFeatureKey = 'notesFeature';

const initialState: IState = {
  notes: [],
  isLoading: false
}

const reducer = createReducer(
  initialState,
  on(NoteActions.init, (state) =>({
    ...state,
    isLoading: true
  })),
  on(NoteActions.set, (state, action) => ({
    ...state,
    notes: action.value,
    isLoading: false
  })),
  on(NoteActions.addedNoteSuccess, (state, action) => ({
      ...state,
      notes: [...state.notes, action.value]
    })
  ),
  on(NoteActions.addedNoteFailure, (state) => ({ ...state })),
  on(NoteActions.removeNoteSuccess, (state, action) => ({
    ...state,
    notes: state.notes.filter(note =>
      note.id !== action.id)
    })
  ),
  on(NoteActions.editNoteSuccess, (state, action) => {
    const index = state.notes.findIndex(note => note.id === action.value.id);
    const updatedNote = {
      ...state.notes[index],
      ...action.value
    };

    const updatedNotes = [...state.notes];
    updatedNotes[index] = updatedNote;

    return {
      ...state,
      notes: updatedNotes
    };
  })
);

export const notesFeature = createFeature({
  name: notesFeatureKey,
  reducer
});
