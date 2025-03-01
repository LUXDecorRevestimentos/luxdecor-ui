import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselCardsComponent } from './carousel-cards.component';

describe('CaarouselCardsComponent', () => {
  let component: CarouselCardsComponent;
  let fixture: ComponentFixture<CarouselCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
