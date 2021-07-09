import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRentModalComponent } from './property-rent-modal.component';

describe('PropertyRentModalComponent', () => {
  let component: PropertyRentModalComponent;
  let fixture: ComponentFixture<PropertyRentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyRentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyRentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
