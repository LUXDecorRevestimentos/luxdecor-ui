import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorysInfoComponent } from './categorys-info.component';

describe('CategorysInfoComponent', () => {
  let component: CategorysInfoComponent;
  let fixture: ComponentFixture<CategorysInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorysInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorysInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
