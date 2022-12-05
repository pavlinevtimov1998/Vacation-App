import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingBtnComponent } from './booking-btn.component';

describe('BookingBtnComponent', () => {
  let component: BookingBtnComponent;
  let fixture: ComponentFixture<BookingBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
