import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/note.model';

@Pipe({
	name: 'noteFilter',
  standalone: true
})
export class NoteFilterPipe implements PipeTransform {

	transform(notes: Note[], filterString: string): Note[] {

		if (!notes || !filterString) {
			return notes;
		}

    const filteredNotes = notes.filter(
      (note: any) => note.title?.toLowerCase().includes(filterString.trim().toLowerCase())
    );

    return filteredNotes;
	}
}
