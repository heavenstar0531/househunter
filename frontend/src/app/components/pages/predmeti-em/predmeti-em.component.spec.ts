import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetiEmComponent } from './predmeti-em.component';

describe('PredmetiEmComponent', () => {
  let component: PredmetiEmComponent;
  let fixture: ComponentFixture<PredmetiEmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetiEmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetiEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
