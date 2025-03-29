import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardPaymentComponent } from './product-card-payment.component';

describe('ProductCardPaymentComponent', () => {
  let component: ProductCardPaymentComponent;
  let fixture: ComponentFixture<ProductCardPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
