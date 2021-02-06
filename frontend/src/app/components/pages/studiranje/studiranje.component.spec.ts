import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiranjeComponent } from './studiranje.component';

describe('StudiranjeComponent', () => {
  let component: StudiranjeComponent;
  let fixture: ComponentFixture<StudiranjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudiranjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudiranjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
