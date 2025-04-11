import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsImgComponent } from './products-img.component';

describe('ProductsImgComponent', () => {
  let component: ProductsImgComponent;
  let fixture: ComponentFixture<ProductsImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsImgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
