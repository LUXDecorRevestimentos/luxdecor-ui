import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixComponentComponent } from './pix.component';

describe('PixComponentComponent', () => {
  let component: PixComponentComponent;
  let fixture: ComponentFixture<PixComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PixComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PixComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
