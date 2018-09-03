import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConferenciasComponent } from './list-conferencias.component';

describe('ListConferenciasComponent', () => {
  let component: ListConferenciasComponent;
  let fixture: ComponentFixture<ListConferenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConferenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
