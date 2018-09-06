import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarPorFechaComponent } from './buscar-por-fecha.component';

describe('BuscarPorFechaComponent', () => {
  let component: BuscarPorFechaComponent;
  let fixture: ComponentFixture<BuscarPorFechaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarPorFechaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarPorFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
