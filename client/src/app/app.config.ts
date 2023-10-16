import { ApplicationConfig } from "@angular/core";
import { RouterModule, provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';

import { routes } from './app-routing.module';
import { NoteEffects } from './core/stores/note-store/note.effects';
import * as fromNotes from './core/stores/note-store/note.state';

export const AppConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideAnimations(),
    provideStore(),
    provideState(fromNotes.notesFeature),
    provideEffects([NoteEffects]),
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
      {
        provide: APOLLO_OPTIONS,
        useFactory: (
          httpLink: HttpLink,
        ): ApolloClientOptions<any> => ({
          link: ApolloLink.from([
            httpLink.create({ uri: 'http://localhost:4000/graphql' }),
          ]),
          cache: new InMemoryCache(),
        }),
        deps: [HttpLink],
      },
      Apollo,
  ]
}
