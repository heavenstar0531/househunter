import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrsInfoComponent } from './crs-info.component';

describe('CrsInfoComponent', () => {
  let component: CrsInfoComponent;
  let fixture: ComponentFixture<CrsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrsInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
