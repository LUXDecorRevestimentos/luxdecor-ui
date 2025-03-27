import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCleanComponent } from './btn-clean.component';

describe('BtnCleanComponent', () => {
  let component: BtnCleanComponent;
  let fixture: ComponentFixture<BtnCleanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnCleanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnCleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
