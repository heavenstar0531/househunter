import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrsPageComponent } from './crs-page.component';

describe('CrsPageComponent', () => {
  let component: CrsPageComponent;
  let fixture: ComponentFixture<CrsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
