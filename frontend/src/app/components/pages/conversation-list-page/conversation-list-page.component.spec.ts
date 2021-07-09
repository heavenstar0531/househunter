import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationListPageComponent } from './conversation-list-page.component';

describe('ConversationListPageComponent', () => {
  let component: ConversationListPageComponent;
  let fixture: ComponentFixture<ConversationListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConversationListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
