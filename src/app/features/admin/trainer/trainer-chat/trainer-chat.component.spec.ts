import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerChatComponent } from './trainer-chat.component';

describe('TrainerChatComponent', () => {
  let component: TrainerChatComponent;
  let fixture: ComponentFixture<TrainerChatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainerChatComponent]
    });
    fixture = TestBed.createComponent(TrainerChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
