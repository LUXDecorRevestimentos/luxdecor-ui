import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BtnIconComponent } from '../btn/btn-icon/btn-icon.component';
import { MatDialog } from '@angular/material/dialog';
import { CartPageComponent } from '../../pages/cart-page/cart-page.component';
import { ProductService } from '../../service/product.service';
import { GenericCard } from '../../data/card.data';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

interface SearchResult {
  id: string;
  name: string;
  product?: string;
}
@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIconModule, RouterModule, BtnIconComponent, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  searchControl = new FormControl();
  searchResults: SearchResult[] = [];
  showSuggestions = false;

  navItems: { label: string; route: string }[] = [];
  mobileMenuOpen = false;

  constructor(public dialog: MatDialog,
    private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProductsCategories().subscribe((categories: GenericCard[]) => {
      this.navItems = categories.map(category => ({
        label: category.title.toUpperCase(),
        route: category.title.toLowerCase().replace(/\s+/g, '-') // Substitui espaços por hífens
      }));
    });
  }
  setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          if (query && query.length >= 2) { // Só pesquisa com 2+ caracteres
            return this.productService.searchProducts(query);
          } else {
            return [];
          }
        })
      )
      .subscribe(results => {
        this.searchResults = results;
        this.showSuggestions = results.length > 0;
      });
  }

  onSearchFocus(): void {
    if (this.searchControl.value && this.searchResults.length) {
      this.showSuggestions = true;
    }
  }

  onSearchBlur(): void {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  selectSuggestion(result: SearchResult): void {
    this.searchControl.setValue(result.name);
    this.showSuggestions = false;
    console.log('Selected:', result);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto';
  }

}