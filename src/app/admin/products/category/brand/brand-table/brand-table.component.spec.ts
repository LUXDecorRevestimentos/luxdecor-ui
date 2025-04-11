import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandTableComponent } from './brand-table.component';

describe('BrandTableComponent', () => {
  let component: BrandTableComponent;
  let fixture: ComponentFixture<BrandTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
