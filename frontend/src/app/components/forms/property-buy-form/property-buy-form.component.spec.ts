import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBuyFormComponent } from './property-buy-form.component';

describe('PropertyBuyFormComponent', () => {
  let component: PropertyBuyFormComponent;
  let fixture: ComponentFixture<PropertyBuyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyBuyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyBuyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
