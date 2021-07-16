import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPromotedComponent } from './property-promoted.component';

describe('PropertyPromotedComponent', () => {
  let component: PropertyPromotedComponent;
  let fixture: ComponentFixture<PropertyPromotedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyPromotedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyPromotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
