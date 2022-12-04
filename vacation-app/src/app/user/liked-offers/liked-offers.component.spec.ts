import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedOffersComponent } from './liked-offers.component';

describe('LikedOffersComponent', () => {
  let component: LikedOffersComponent;
  let fixture: ComponentFixture<LikedOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
