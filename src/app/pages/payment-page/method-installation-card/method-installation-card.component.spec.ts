import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodInstallationCardComponent } from './method-installation-card.component';

describe('MethodInstallationCardComponent', () => {
  let component: MethodInstallationCardComponent;
  let fixture: ComponentFixture<MethodInstallationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MethodInstallationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MethodInstallationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
