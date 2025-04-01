import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrderComponent } from './card-order.component';

describe('CardOrderComponent', () => {
  let component: CardOrderComponent;
  let fixture: ComponentFixture<CardOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
