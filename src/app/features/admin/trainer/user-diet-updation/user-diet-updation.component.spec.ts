import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDietUpdationComponent } from './user-diet-updation.component';

describe('UserDietUpdationComponent', () => {
  let component: UserDietUpdationComponent;
  let fixture: ComponentFixture<UserDietUpdationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDietUpdationComponent]
    });
    fixture = TestBed.createComponent(UserDietUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
