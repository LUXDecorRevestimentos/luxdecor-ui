import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesContentComponent } from './categories-content.component';

describe('CategoriesContentComponent', () => {
  let component: CategoriesContentComponent;
  let fixture: ComponentFixture<CategoriesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
