import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegVerificadorComponent } from './reg-verificador.component';

describe('RegVerificadorComponent', () => {
  let component: RegVerificadorComponent;
  let fixture: ComponentFixture<RegVerificadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegVerificadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegVerificadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
