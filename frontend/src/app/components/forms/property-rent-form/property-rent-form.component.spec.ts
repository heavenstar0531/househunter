import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRentFormComponent } from './property-rent-form.component';

describe('PropertyRentFormComponent', () => {
  let component: PropertyRentFormComponent;
  let fixture: ComponentFixture<PropertyRentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyRentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyRentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
