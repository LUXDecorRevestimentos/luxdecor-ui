import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorysContentComponent } from './categorys-content.component';

describe('CategorysContentComponent', () => {
  let component: CategorysContentComponent;
  let fixture: ComponentFixture<CategorysContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorysContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorysContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
