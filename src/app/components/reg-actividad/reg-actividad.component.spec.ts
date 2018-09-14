import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegActividadComponent } from './reg-actividad.component';

describe('RegActividadComponent', () => {
  let component: RegActividadComponent;
  let fixture: ComponentFixture<RegActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
