import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateNoteComponent } from './modal-create-note.component';

describe('ModalCreateNoteComponent', () => {
  let component: ModalCreateNoteComponent;
  let fixture: ComponentFixture<ModalCreateNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreateNoteComponent]
    });
    fixture = TestBed.createComponent(ModalCreateNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
