import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEntradaSalidaComponent } from './list-entrada-salida.component';

describe('ListEntradaSalidaComponent', () => {
  let component: ListEntradaSalidaComponent;
  let fixture: ComponentFixture<ListEntradaSalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEntradaSalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEntradaSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
