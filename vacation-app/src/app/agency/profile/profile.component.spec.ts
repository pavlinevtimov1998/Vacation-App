import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: AgencyProfileComponent;
  let fixture: ComponentFixture<AgencyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgencyProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AgencyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
