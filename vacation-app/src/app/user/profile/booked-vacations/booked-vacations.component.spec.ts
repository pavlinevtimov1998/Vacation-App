import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedVacationsComponent } from './booked-vacations.component';

describe('BookedVacationsComponent', () => {
  let component: BookedVacationsComponent;
  let fixture: ComponentFixture<BookedVacationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedVacationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookedVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
