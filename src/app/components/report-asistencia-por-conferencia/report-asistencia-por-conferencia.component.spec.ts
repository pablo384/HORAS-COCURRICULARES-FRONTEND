import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAsistenciaPorConferenciaComponent } from './report-asistencia-por-conferencia.component';

describe('ReportAsistenciaPorConferenciaComponent', () => {
  let component: ReportAsistenciaPorConferenciaComponent;
  let fixture: ComponentFixture<ReportAsistenciaPorConferenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportAsistenciaPorConferenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAsistenciaPorConferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
