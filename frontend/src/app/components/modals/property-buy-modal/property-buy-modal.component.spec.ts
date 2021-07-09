import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBuyModalComponent } from './property-buy-modal.component';

describe('PropertyBuyModalComponent', () => {
  let component: PropertyBuyModalComponent;
  let fixture: ComponentFixture<PropertyBuyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyBuyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyBuyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
