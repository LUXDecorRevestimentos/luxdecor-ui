import { Component } from '@angular/core';
import { BarComponent } from '../../bar/bar.component';

@Component({
  selector: 'app-filter-price',
  imports: [BarComponent],
  templateUrl: './filter-price.component.html',
  styleUrl: './filter-price.component.css'
})
export class FilterPriceComponent {
  title = "Preços imbatíveis."
}
