import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikListAdmComponent } from './korisnik-list-adm.component';

describe('KorisnikListAdmComponent', () => {
  let component: KorisnikListAdmComponent;
  let fixture: ComponentFixture<KorisnikListAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisnikListAdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikListAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
