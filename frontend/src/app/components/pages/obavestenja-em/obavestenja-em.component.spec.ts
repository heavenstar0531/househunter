import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObavestenjaEmComponent } from './obavestenja-em.component';

describe('ObavestenjaEmComponent', () => {
  let component: ObavestenjaEmComponent;
  let fixture: ComponentFixture<ObavestenjaEmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObavestenjaEmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObavestenjaEmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
