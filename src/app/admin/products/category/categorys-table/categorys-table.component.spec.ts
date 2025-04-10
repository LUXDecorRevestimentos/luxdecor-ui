import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorysTableComponent } from './categorys-table.component';

describe('CategorysTableComponent', () => {
  let component: CategorysTableComponent;
  let fixture: ComponentFixture<CategorysTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorysTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorysTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
