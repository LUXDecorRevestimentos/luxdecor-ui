import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinallyPageComponent } from './finally-page.component';

describe('FinallyPageComponent', () => {
  let component: FinallyPageComponent;
  let fixture: ComponentFixture<FinallyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinallyPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinallyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
