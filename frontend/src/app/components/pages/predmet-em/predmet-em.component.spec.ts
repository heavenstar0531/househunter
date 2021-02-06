import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetEmComponent } from './predmet-em.component';

describe('PredmetEmComponent', () => {
  let component: PredmetEmComponent;
  let fixture: ComponentFixture<PredmetEmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetEmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
