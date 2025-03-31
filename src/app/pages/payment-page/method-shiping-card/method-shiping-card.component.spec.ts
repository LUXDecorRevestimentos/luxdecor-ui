import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodShipingCardComponent } from './method-shiping-card.component';

describe('MethodShipingCardComponent', () => {
  let component: MethodShipingCardComponent;
  let fixture: ComponentFixture<MethodShipingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodShipingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethodShipingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
