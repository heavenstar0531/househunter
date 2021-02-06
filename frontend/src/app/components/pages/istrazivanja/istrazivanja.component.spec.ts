import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IstrazivanjaComponent } from './istrazivanja.component';

describe('IstrazivanjaComponent', () => {
  let component: IstrazivanjaComponent;
  let fixture: ComponentFixture<IstrazivanjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IstrazivanjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IstrazivanjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
