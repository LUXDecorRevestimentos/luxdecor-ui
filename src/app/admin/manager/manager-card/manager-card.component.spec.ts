import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCardComponent } from './manager-card.component';

describe('ManagerCardComponent', () => {
  let component: ManagerCardComponent;
  let fixture: ComponentFixture<ManagerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
