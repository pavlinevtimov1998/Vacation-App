import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferImagesCarouselComponent } from './offer-images-carousel.component';

describe('OfferImagesCarouselComponent', () => {
  let component: OfferImagesCarouselComponent;
  let fixture: ComponentFixture<OfferImagesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferImagesCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferImagesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
