import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikAdmComponent } from './korisnik-adm.component';

describe('KorisnikAdmComponent', () => {
  let component: KorisnikAdmComponent;
  let fixture: ComponentFixture<KorisnikAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisnikAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
