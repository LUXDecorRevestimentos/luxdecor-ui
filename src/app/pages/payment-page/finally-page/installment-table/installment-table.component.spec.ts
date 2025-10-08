import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallmentTableComponent } from './installment-table.component';

describe('InstallmentTableComponent', () => {
  let component: InstallmentTableComponent;
  let fixture: ComponentFixture<InstallmentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallmentTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallmentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
