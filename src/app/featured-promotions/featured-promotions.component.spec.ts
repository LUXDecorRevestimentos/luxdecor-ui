import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPromotionsComponent } from './featured-promotions.component';

describe('FeaturedPromotionsComponent', () => {
  let component: FeaturedPromotionsComponent;
  let fixture: ComponentFixture<FeaturedPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedPromotionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
