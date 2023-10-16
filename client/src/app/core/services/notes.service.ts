import { Injectable } from "@angular/core";
import { Apollo, MutationResult } from "apollo-angular";
import { ApolloQueryResult } from "@apollo/client/core/types";
import { Observable } from "rxjs";

import { ADD_NOTE, DELETE_NOTE, GET_NOTES, UPDATE_NOTE } from "../graphql/graphql.queries";
import { IGetNotesResponse } from "../interfaces/get-notes-response.interface";
import { IAddNoteResponse } from "../interfaces/add-note-response.interface";
import { IUpdateNoteResponse } from "../interfaces/update-note-response.interface";
import { IDeleteNoteResponse } from "../interfaces/delete-note-response.interface";

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private apollo: Apollo) {}

  getNotes(): Observable<ApolloQueryResult<IGetNotesResponse>> {
    return this.apollo.query<IGetNotesResponse>({
      query: GET_NOTES
    })
  }

  addNote(title: string, description: string): Observable<MutationResult<IAddNoteResponse>> {
    return this.apollo.mutate<IAddNoteResponse>({
      mutation: ADD_NOTE,
      variables: {
        title,
        description
      }
    });
  }

  updateNote(id: number, title: string, description: string): Observable<MutationResult<IUpdateNoteResponse>> {
    return this.apollo.mutate<IUpdateNoteResponse>({
      mutation: UPDATE_NOTE,
      variables: {
        id,
        title,
        description
      }
    })
  }

  deleteNote(id: number): Observable<MutationResult<IDeleteNoteResponse>> {
    return this.apollo.mutate<IDeleteNoteResponse>({
      mutation: DELETE_NOTE,
      variables: {
        id
      }
    })
  }
}
