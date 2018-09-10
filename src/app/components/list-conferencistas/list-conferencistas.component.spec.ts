import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConferencistasComponent } from './list-conferencistas.component';

describe('ListConferencistasComponent', () => {
  let component: ListConferencistasComponent;
  let fixture: ComponentFixture<ListConferencistasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListConferencistasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListConferencistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
