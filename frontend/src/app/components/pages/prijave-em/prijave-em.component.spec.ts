import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijaveEmComponent } from './prijave-em.component';

describe('PrijaveEmComponent', () => {
  let component: PrijaveEmComponent;
  let fixture: ComponentFixture<PrijaveEmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrijaveEmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrijaveEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
