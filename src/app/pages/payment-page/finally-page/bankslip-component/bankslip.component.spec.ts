import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSlipComponent } from './bankslip.component';

describe('SplitComponent', () => {
  let component: BankSlipComponent;
  let fixture: ComponentFixture<BankSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankSlipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
