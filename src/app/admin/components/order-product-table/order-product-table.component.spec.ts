import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductTableComponent } from './order-product-table.component';

describe('OrderProductTableComponent', () => {
  let component: OrderProductTableComponent;
  let fixture: ComponentFixture<OrderProductTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProductTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProductTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
