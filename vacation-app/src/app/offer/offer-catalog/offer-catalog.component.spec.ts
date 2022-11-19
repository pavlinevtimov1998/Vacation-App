import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCatalogComponent } from './offer-catalog.component';

describe('OfferCatalogComponent', () => {
  let component: OfferCatalogComponent;
  let fixture: ComponentFixture<OfferCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfferCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
