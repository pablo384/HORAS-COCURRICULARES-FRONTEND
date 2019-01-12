import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEstudiantesComponent } from './report-estudiantes.component';

describe('ReportEstudiantesComponent', () => {
  let component: ReportEstudiantesComponent;
  let fixture: ComponentFixture<ReportEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
