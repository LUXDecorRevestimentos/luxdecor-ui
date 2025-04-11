import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTableComponent } from './sales-table.component';

describe('SalesTableComponent', () => {
  let component: SalesTableComponent;
  let fixture: ComponentFixture<SalesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
