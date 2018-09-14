import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegCarreraComponent } from './reg-carrera.component';

describe('RegCarreraComponent', () => {
  let component: RegCarreraComponent;
  let fixture: ComponentFixture<RegCarreraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegCarreraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegCarreraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
