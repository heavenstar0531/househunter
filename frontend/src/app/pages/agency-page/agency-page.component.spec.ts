import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyPageComponent } from './agency-page.component';

describe('AgencyPageComponent', () => {
  let component: AgencyPageComponent;
  let fixture: ComponentFixture<AgencyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
