import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnNextComponent } from './btn-next.component';

describe('BtnNextComponent', () => {
  let component: BtnNextComponent;
  let fixture: ComponentFixture<BtnNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnNextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
