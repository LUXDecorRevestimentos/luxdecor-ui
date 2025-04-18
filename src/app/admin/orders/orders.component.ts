import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CardDataComponent } from '../components/card-data/card-data.component';
import { OrderChartComponent } from '../components/order-chart/order-chart.component';
import { OrderTableResumeComponent } from './order-table-resume/order-table-resume.component';
import { OrderAuthService } from '../service/order.auth.service';
import { OrderDetailsTable } from '../../data/table.data';
import { OrderTable, ProductTable } from '../../data/table.data';
import { CommonModule } from '@angular/common';
import { ClientAuthService } from '../service/client.auth.service';
import { ClientData } from '../data/client.data';
import { OrderClientComponent } from './order-client/order-client.component';
import { OrderProductComponent } from './order-product/order-product.component';
import { OrderStatusUpdateComponent } from './order-status-update/order-status-update.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { OrderProductTableComponent } from './order-product-table/order-product-table.component';
import { ProductAuthService } from '../service/product.auth.service';
import { ProductData } from '../data/product.data';

@Component({
  selector: 'app-orders',
  imports: [
    MatIcon,
    CardDataComponent,
    OrderChartComponent,
    OrderTableResumeComponent,
    OrderTableComponent,
    OrderProductTableComponent,
    OrderClientComponent,
    OrderProductComponent,
    OrderStatusUpdateComponent,
    CommonModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  detailTable: OrderDetailsTable[]  = [];
  detailProducts: ProductTable[] = [];
  orders: OrderTable[]  = [];
  client!: ClientData;
  product!: ProductData;
  order!: OrderDetailsTable;


  constructor(private orderService: OrderAuthService, 
              private clientService: ClientAuthService,
              private productService: ProductAuthService) {}
  
  ngOnInit(): void {
    this.populateDashboardData();
  }

  populateDashboardData() {
    this.orderService.getOrderData().subscribe((data) => {
      this.detailTable = data;
      this.order = data[Math.random() * data.length | 0];
    });

    this.orderService.getOrderTable().subscribe((orders) => {
      this.orders = orders;
    });
  }

  onRowSelectedOrder(row: OrderTable) {
    this.orderService.getProductTable().subscribe((products) => {
      this.detailProducts = products;
    });
    this.clientService.getClientData().subscribe((client) => {
      this.client = client;
    });    
  }

  onRowSelectedProduct(row: ProductTable) {
    this.productService.getProductId().subscribe((product) => {
      this.product = product;
    });
  }
}
