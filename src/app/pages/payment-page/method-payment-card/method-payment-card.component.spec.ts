import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodPaymentCardComponent } from './method-payment-card.component';

describe('MethodPaymentCardComponent', () => {
  let component: MethodPaymentCardComponent;
  let fixture: ComponentFixture<MethodPaymentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodPaymentCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethodPaymentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
