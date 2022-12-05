import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActionBtnsComponent } from './user-action-btns.component';

describe('UserActionBtnsComponent', () => {
  let component: UserActionBtnsComponent;
  let fixture: ComponentFixture<UserActionBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserActionBtnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserActionBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
