import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTableResumeComponent } from './order-table-resume.component';

describe('OrderTableResumeComponent', () => {
  let component: OrderTableResumeComponent;
  let fixture: ComponentFixture<OrderTableResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderTableResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTableResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
