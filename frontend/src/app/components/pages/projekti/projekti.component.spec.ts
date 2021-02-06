import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektiComponent } from './projekti.component';

describe('ProjektiComponent', () => {
  let component: ProjektiComponent;
  let fixture: ComponentFixture<ProjektiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjektiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
