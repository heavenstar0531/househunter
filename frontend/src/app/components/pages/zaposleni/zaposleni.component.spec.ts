import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposleniComponent } from './zaposleni.component';

describe('ZaposleniComponent', () => {
  let component: ZaposleniComponent;
  let fixture: ComponentFixture<ZaposleniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposleniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposleniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
