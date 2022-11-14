import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAgenciesComponent } from './top-agencies.component';

describe('TopAgenciesComponent', () => {
  let component: TopAgenciesComponent;
  let fixture: ComponentFixture<TopAgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopAgenciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopAgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
