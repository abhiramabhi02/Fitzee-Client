import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesManagementComponent } from './packages-management.component';

describe('PackagesManagementComponent', () => {
  let component: PackagesManagementComponent;
  let fixture: ComponentFixture<PackagesManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackagesManagementComponent]
    });
    fixture = TestBed.createComponent(PackagesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
