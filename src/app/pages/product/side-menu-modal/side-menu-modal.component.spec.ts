import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideMenuModalComponent } from './side-menu-modal.component';

describe('SideMenuModalComponent', () => {
  let component: SideMenuModalComponent;
  let fixture: ComponentFixture<SideMenuModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideMenuModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideMenuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
