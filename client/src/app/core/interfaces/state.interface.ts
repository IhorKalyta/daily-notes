import { Note } from "../models/note.model";

export interface IState {
  notes: Note[];
  isLoading: boolean;
}
