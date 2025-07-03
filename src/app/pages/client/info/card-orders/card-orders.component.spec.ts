import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrdersComponent } from './card-orders.component';

describe('CardOrdersComponent', () => {
  let component: CardOrdersComponent;
  let fixture: ComponentFixture<CardOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
