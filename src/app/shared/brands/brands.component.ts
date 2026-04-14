import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from '../bar/bar.component';
import { ImgUrlPipe } from '../pipe/img-url.pipe';

@Component({
  selector: 'app-brands',
  imports: [CommonModule, BarComponent, ImgUrlPipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit, OnChanges {
  @Input() images: any[] = [];
  @Output() brandClick = new EventEmitter<string>();

  title = "Marcas";

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {}

  validateImageList() {
    if (this.images.length < 2 || this.images.length > 3) {
      throw new Error('A lista de imagens deve conter no mínimo 2 e no máximo 3 itens.');
    }
  }

  onBrandClick(brandId: string){
    this.brandClick.emit(brandId)
  }
}
