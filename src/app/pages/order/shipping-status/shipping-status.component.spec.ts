import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingStatusComponent } from './shipping-status.component';

describe('ShippingStatusComponent', () => {
  let component: ShippingStatusComponent;
  let fixture: ComponentFixture<ShippingStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
