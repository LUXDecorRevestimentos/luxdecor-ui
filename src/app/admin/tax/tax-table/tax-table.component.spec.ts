import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxTableComponent } from './tax-table.component';

describe('TaxTableComponent', () => {
  let component: TaxTableComponent;
  let fixture: ComponentFixture<TaxTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
