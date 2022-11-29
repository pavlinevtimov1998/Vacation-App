import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChoicesComponent } from './account-choices.component';

describe('AccountChoicesComponent', () => {
  let component: AccountChoicesComponent;
  let fixture: ComponentFixture<AccountChoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountChoicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
