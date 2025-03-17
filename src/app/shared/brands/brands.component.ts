import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from '../bar/bar.component';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, BarComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  @Input() images: string[] = [];
  title = "Marcas";

  ngOnInit() {
    // this.validateImageList();
  }

  validateImageList() {
    if (this.images.length < 2 || this.images.length > 3) {
      throw new Error('A lista de imagens deve conter no mínimo 2 e no máximo 3 itens.');
    }
  }
}
