import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedVacationsComponent } from './reserved-vacations.component';

describe('ReservedVacationsComponent', () => {
  let component: ReservedVacationsComponent;
  let fixture: ComponentFixture<ReservedVacationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedVacationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservedVacationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
