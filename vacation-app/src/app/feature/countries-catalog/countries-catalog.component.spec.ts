import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesCatalogComponent } from './countries-catalog.component';

describe('CountriesCatalogComponent', () => {
  let component: CountriesCatalogComponent;
  let fixture: ComponentFixture<CountriesCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
