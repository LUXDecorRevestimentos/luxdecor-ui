import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryTableComponent } from './subcategory-table.component';

describe('SubcategoryTableComponent', () => {
  let component: SubCategoryTableComponent;
  let fixture: ComponentFixture<SubCategoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategoryTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
