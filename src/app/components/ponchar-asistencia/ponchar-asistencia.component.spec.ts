import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoncharAsistenciaComponent } from './ponchar-asistencia.component';

describe('PoncharAsistenciaComponent', () => {
  let component: PoncharAsistenciaComponent;
  let fixture: ComponentFixture<PoncharAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoncharAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoncharAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
