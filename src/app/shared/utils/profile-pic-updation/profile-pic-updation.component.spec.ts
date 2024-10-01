import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicUpdationComponent } from './profile-pic-updation.component';

describe('ProfilePicUpdationComponent', () => {
  let component: ProfilePicUpdationComponent;
  let fixture: ComponentFixture<ProfilePicUpdationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilePicUpdationComponent]
    });
    fixture = TestBed.createComponent(ProfilePicUpdationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
