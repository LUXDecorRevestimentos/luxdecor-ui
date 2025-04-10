import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryComponent } from './subcategory.component';

describe('SubcategoryComponent', () => {
  let component: SubCategoryComponent;
  let fixture: ComponentFixture<SubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
