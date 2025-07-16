import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BtnIconComponent } from '../btn/btn-icon/btn-icon.component';
import { ProductService } from '../../service/product.service';
import { GenericCard } from '../../data/card.data';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

interface SearchResult {
  id: string;
  name: string;
  product?: string;
}
@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIconModule, RouterModule, BtnIconComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  searchControl = new FormControl();
  suggestions: any[] = [];
  showSuggestions = false;
  mobileMenuOpen = false;
  isSearchFocused = false;

  navItems: { label: string; route: string }[] = [];

  constructor(private router: Router,
    private productService: ProductService) {
          this.setupSearch();
    }

  ngOnInit(): void {
    this.productService.getProductsCategories().subscribe((categories: GenericCard[]) => {
      this.navItems = categories.map(category => ({
        label: category.title.toUpperCase(),
        route: category.title.toLowerCase().replace(/\s+/g, '-')
      }));
    });
  }

  setupSearch(): void {
    this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        return this.productService.searchProducts(query).pipe();
      })
    )
    .subscribe({
      next: results => {
        this.suggestions = results;
        this.showSuggestions = results.length > 0 && this.isSearchFocused;
      },
      error: err => console.error('Erro:', err)
    });
  }

  onSearchFocus() {
    this.isSearchFocused = true;
    if (this.searchControl.value && this.searchControl.value.length >= 2) {
      this.showSuggestions = this.suggestions.length > 0;
    }
  }

  onSearchBlur() {
    setTimeout(() => {
      this.isSearchFocused = false;
      this.showSuggestions = false;
    }, 200);
  }

  selectProduct(product: any) {
    this.showSuggestions = false;
    this.searchControl.setValue('');
    
    this.router.navigate(['/product'], {
      queryParams: { product: product.product_id }
    }).then(navigated => {
      if (!navigated) {
        console.error('Falha na navegação');
      }
    }).catch(err => {
      console.error('Erro na navegação:', err);
    });
  }
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : 'auto';
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.showSuggestions = false;
  }
}