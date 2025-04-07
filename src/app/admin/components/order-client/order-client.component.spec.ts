import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderClientComponent } from './order-client.component';

describe('OrderClientComponent', () => {
  let component: OrderClientComponent;
  let fixture: ComponentFixture<OrderClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
