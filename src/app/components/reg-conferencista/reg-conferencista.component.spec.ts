import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegConferencistaComponent } from './reg-conferencista.component';

describe('RegConferencistaComponent', () => {
  let component: RegConferencistaComponent;
  let fixture: ComponentFixture<RegConferencistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegConferencistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegConferencistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
