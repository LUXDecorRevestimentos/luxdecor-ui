import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponentComponent } from './sidenav-component.component';

describe('SidenavComponentComponent', () => {
  let component: SidenavComponentComponent;
  let fixture: ComponentFixture<SidenavComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
