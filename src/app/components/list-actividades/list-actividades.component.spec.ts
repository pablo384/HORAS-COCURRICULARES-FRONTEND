import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActividadesComponent } from './list-actividades.component';

describe('ListActividadesComponent', () => {
  let component: ListActividadesComponent;
  let fixture: ComponentFixture<ListActividadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListActividadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
