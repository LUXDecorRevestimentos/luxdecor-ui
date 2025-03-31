import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnConfirmComponent } from './btn-confirm.component';

describe('BtnConfirmComponent', () => {
  let component: BtnConfirmComponent;
  let fixture: ComponentFixture<BtnConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
