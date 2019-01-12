import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCuatrimestresComponent } from './report-cuatrimestres.component';

describe('ReportCuatrimestresComponent', () => {
  let component: ReportCuatrimestresComponent;
  let fixture: ComponentFixture<ReportCuatrimestresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCuatrimestresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCuatrimestresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
