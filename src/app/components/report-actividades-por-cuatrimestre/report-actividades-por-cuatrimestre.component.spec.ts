import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportActividadesPorCuatrimestreComponent } from './report-actividades-por-cuatrimestre.component';

describe('ReportActividadesPorCuatrimestreComponent', () => {
  let component: ReportActividadesPorCuatrimestreComponent;
  let fixture: ComponentFixture<ReportActividadesPorCuatrimestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportActividadesPorCuatrimestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportActividadesPorCuatrimestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
