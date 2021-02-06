import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredmetStComponent } from './predmet-st.component';

describe('PredmetStComponent', () => {
  let component: PredmetStComponent;
  let fixture: ComponentFixture<PredmetStComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredmetStComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredmetStComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
