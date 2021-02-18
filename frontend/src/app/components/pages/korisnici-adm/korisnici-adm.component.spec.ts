import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisniciAdmComponent } from './korisnici-adm.component';

describe('KorisniciAdmComponent', () => {
  let component: KorisniciAdmComponent;
  let fixture: ComponentFixture<KorisniciAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisniciAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisniciAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
