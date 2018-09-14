import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleConferenciaComponent } from './detalle-conferencia.component';

describe('DetalleConferenciaComponent', () => {
  let component: DetalleConferenciaComponent;
  let fixture: ComponentFixture<DetalleConferenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleConferenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleConferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
