import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegEstudianteComponent } from './reg-estudiante.component';

describe('RegEstudianteComponent', () => {
  let component: RegEstudianteComponent;
  let fixture: ComponentFixture<RegEstudianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegEstudianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
