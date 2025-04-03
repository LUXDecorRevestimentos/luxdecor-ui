import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodShippingCardComponent } from './method-shipping-card.component';

describe('MethodShipingCardComponent', () => {
  let component: MethodShippingCardComponent;
  let fixture: ComponentFixture<MethodShippingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodShippingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethodShippingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
