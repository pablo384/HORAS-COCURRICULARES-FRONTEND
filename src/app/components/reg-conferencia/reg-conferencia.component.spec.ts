import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegConferenciaComponent } from './reg-conferencia.component';

describe('RegConferenciaComponent', () => {
  let component: RegConferenciaComponent;
  let fixture: ComponentFixture<RegConferenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegConferenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegConferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
