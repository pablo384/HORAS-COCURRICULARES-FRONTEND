import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciarActividadComponent } from './iniciar-actividad.component';

describe('IniciarActividadComponent', () => {
  let component: IniciarActividadComponent;
  let fixture: ComponentFixture<IniciarActividadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciarActividadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
