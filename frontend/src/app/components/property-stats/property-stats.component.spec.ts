import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyStatsComponent } from './property-stats.component';

describe('PropertyStatsComponent', () => {
  let component: PropertyStatsComponent;
  let fixture: ComponentFixture<PropertyStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
