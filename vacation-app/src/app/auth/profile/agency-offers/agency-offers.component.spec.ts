import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyOffersComponent } from './agency-offers.component';

describe('AgencyOffersComponent', () => {
  let component: AgencyOffersComponent;
  let fixture: ComponentFixture<AgencyOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencyOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
