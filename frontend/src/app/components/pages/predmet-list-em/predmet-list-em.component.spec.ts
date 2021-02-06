import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetListEmComponent } from './predmet-list-em.component';

describe('PredmetListEmComponent', () => {
  let component: PredmetListEmComponent;
  let fixture: ComponentFixture<PredmetListEmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetListEmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetListEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
