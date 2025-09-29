import { Component, Input, OnInit } from '@angular/core';
import { SaleDataOrder } from '../../data/payment.data';

@Component({
  selector: 'app-sale-card',
  imports: [],
  templateUrl: './sale-card.component.html',
  styleUrl: './sale-card.component.css'
})
export class SaleCardComponent implements OnInit {

  @Input() sale_item: SaleDataOrder | null = null;

  count: number = 1;
  priceLabel: string = "0,00 x (1)";

  ngOnInit(): void {
    if (this.sale_item) {
      this.count = this.sale_item.amount || 1;
      this.priceLabel = this.getPriceLabel(this.sale_item.product_price, this.sale_item.amount)
    }
  }

  private parseCurrency(value: string): number {
    return parseFloat(
      value.replace(/\./g, '')
          .replace(',', '.')
    );
  }

  private formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  getPriceLabel(totalPrice: string, amount: number): string {
    const numericTotal = this.parseCurrency(totalPrice);
    const unitPrice = amount > 0 ? numericTotal / amount : 0;
    const formattedUnitPrice = this.formatCurrency(unitPrice);
    return `${formattedUnitPrice} x (${amount})`;
  }

}
