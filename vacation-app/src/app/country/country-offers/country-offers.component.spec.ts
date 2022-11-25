import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryOffersComponent } from './country-offers.component';

describe('CountryOffersComponent', () => {
  let component: CountryOffersComponent;
  let fixture: ComponentFixture<CountryOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
