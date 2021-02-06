import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PonudeComponent } from './ponude.component';

describe('PonudeComponent', () => {
  let component: PonudeComponent;
  let fixture: ComponentFixture<PonudeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PonudeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PonudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
