import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAsistenciasComponent } from './list-asistencias.component';

describe('ListAsistenciasComponent', () => {
  let component: ListAsistenciasComponent;
  let fixture: ComponentFixture<ListAsistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAsistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
