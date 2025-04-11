import { Component, Input, Inject} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { OrderDetailsTable } from '../../../data/table.data';
import { BtnComponent } from '../../components/btn/btn.component';
import { OrderStatusComponent } from '../order-status/order-status.component';

@Component({
  selector: 'app-order-table-resume',
  imports: [MatTableModule, BtnComponent, OrderStatusComponent],
  templateUrl: './order-table-resume.component.html',
  styleUrl: './order-table-resume.component.css'
})
export class OrderTableResumeComponent {
  displayedColumns: string[] = ['orderId', 'status', 'date'];

  @Input() detailTable: OrderDetailsTable[]  = [];
  @Input() title: string = "";
  @Input() headerOne: string = "";
  @Input() headerTwo: string = "";
  @Input() headerThree: string = "";

  detailsData: OrderDetailsTable[] = []; 

  detailsColumns: string[] = ['id', 'status', 'date'];

  ngOnInit(): void {
    this.detailsData = this.detailTable
  }
}

