import { Component, Input } from '@angular/core';
import { ClientsTableComponent } from '../clients-table/clients-table.component';
import { OrderClientComponent } from '../../orders/order-client/order-client.component';
import { ClientAuthService } from '../../service/client.auth.service';
import { ClientData } from '../../data/client.data';
import { ClientTable, OrderDetailsTable } from '../../../data/table.data';
import { OrderTableResumeComponent } from '../../orders/order-table-resume/order-table-resume.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-info',
  imports: [ ClientsTableComponent, OrderTableResumeComponent, OrderClientComponent, CommonModule ],
  templateUrl: './client-info.component.html',
  styleUrl: './client-info.component.css'
})
export class ClientInfoComponent {

  @Input() detailTable: OrderDetailsTable[]  = [];
  @Input() clientTable: ClientTable[] = [];
  @Input() client!: ClientData;

  constructor (private clientService: ClientAuthService){}

  onRowSelectedClient(row: ClientTable) {
    this.clientService.getClientData().subscribe((client) => {
      this.client = client;
    });    
  }

}
