import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZaposlenComponent } from './zaposlen.component';

describe('ZaposlenComponent', () => {
  let component: ZaposlenComponent;
  let fixture: ComponentFixture<ZaposlenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZaposlenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZaposlenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
