import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ProductData } from '../../data/product.data';
import { BarComponent } from '../../../shared/bar/bar.component';
import { OrderStatus, OrderStatusLabels } from '../../../data/table.data';
import { BtnComponent } from '../../components/btn/btn.component';

@Component({
  selector: 'app-order-product',
  imports: [BarComponent, BtnComponent],
  templateUrl: './order-product.component.html',
  styleUrl: './order-product.component.css'
})
export class OrderProductComponent  implements OnInit {

  @Input() productData!: ProductData;

  ngOnInit(): void {
  }

  getLabelStatus(orderStatus: OrderStatus): string {
    let orderStatusLabel: string = "";
    if ( orderStatus && orderStatus !== undefined) {
      orderStatusLabel = OrderStatusLabels[orderStatus] || 'Unknown Status';
    }
    return orderStatusLabel;
  }
  

}
