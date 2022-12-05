import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreOffersComponent } from './more-offers.component';

describe('MoreOffersComponent', () => {
  let component: MoreOffersComponent;
  let fixture: ComponentFixture<MoreOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreOffersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoreOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
