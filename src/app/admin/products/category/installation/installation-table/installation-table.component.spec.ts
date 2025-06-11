import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationTableComponent } from './installation-table.component';

describe('InstallationTableComponent', () => {
  let component: InstallationTableComponent;
  let fixture: ComponentFixture<InstallationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallationTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
