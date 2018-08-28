import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxBodyComponent } from './box-body.component';

describe('BoxBodyComponent', () => {
  let component: BoxBodyComponent;
  let fixture: ComponentFixture<BoxBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
