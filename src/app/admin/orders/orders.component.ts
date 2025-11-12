import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CardDataComponent } from '../components/card-data/card-data.component';
import { OrderChartComponent } from '../components/order-chart/order-chart.component';
import { OrderTableResumeComponent } from './order-table-resume/order-table-resume.component';
import { OrderAuthService } from '../service/order.auth.service';
import { OrderDetailsTable, OrderStatus, OrderUpdateStatus } from '../../data/table.data';
import { OrderTable, ProductTable } from '../../data/table.data';
import { CommonModule, formatDate } from '@angular/common';
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
  orderTable: OrderDetailsTable[] = [];
  detailTable: OrderDetailsTable[]  = [];
  historyTable: OrderDetailsTable[]  = [];
  detailProducts: ProductTable[] = [];
  orders: OrderTable[]  = [];
  client!: ClientData;
  product!: ProductData;
  order!: OrderDetailsTable;
  orderStatus!: OrderUpdateStatus;
  selectedRowOrderTable!: OrderTable;
  orderChart: any;
  timeUpdate: string = "";

  constructor(private orderService: OrderAuthService, 
              private clientService: ClientAuthService,
              private productService: ProductAuthService) {}
  
  ngOnInit(): void {
    this.populateDashboardData();
  }

  populateDashboardData() {
    this.orderService.getOrderTable().subscribe((data) => {
      this.orders = data;      
      this.order = data[Math.random() * data.length | 0];
    });
    this.orderService.getOrders().subscribe((orders) => {
      this.detailTable = orders;
    })
    this.orderService.getOrderChart("dia").subscribe((chart) => {
      this.orderChart = chart;
      const now = new Date();
      this.timeUpdate = formatDate(now, 'HH:mm dd/MM/yyyy', 'pt-BR');
    })
  }

  onRowSelectedOrder(row: OrderTable) {
    this.detailProducts = []
    this.orderService.getCartTable(row.cartId).subscribe((products) => {
      this.detailProducts = products;
    });

    this.orderService.getClientData(row.cartId).subscribe((client) => {
      this.client = client;
    })
    this.selectedRowOrderTable = row;
  }

  onRowSelectedProduct(row: ProductTable) {
    this.product == null;
    this.orderStatus = {...{
        order_id: '',
        status: OrderStatus.PENDING,
      }};
    this.productService.getProductId(row.orderId, row.productId).subscribe((product) => {
      this.product = product;
      this.orderStatus = {...{
        order_id: row.orderId,
        status: row.status,
      }};
    })
    this.orderService.getOrderHistory(row.orderId).subscribe((orderHistory) => {
      this.historyTable = orderHistory;
    })

  }

  onUpdateOrderStatus($event: OrderUpdateStatus) {
    this.orderService.updateOrderStatus($event).subscribe({
      next: () => {
        this.detailProducts = [];
        this.populateDashboardData();
        this.onRowSelectedOrder(this.selectedRowOrderTable)
      },
      error: (err) => {
        console.error('Erro ao atualizar o status do pedido', err);
      }
    });
  }

  onChangeChart($event: string){
    this.orderService.getOrderChart($event).subscribe((chart) => {
      this.orderChart = chart;
      const now = new Date();
      this.timeUpdate = formatDate(now, 'HH:mm dd/MM/yyyy', 'pt-BR');
    })
  }
  

}
