import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVerificadoresComponent } from './list-verificadores.component';

describe('ListVerificadoresComponent', () => {
  let component: ListVerificadoresComponent;
  let fixture: ComponentFixture<ListVerificadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVerificadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVerificadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
