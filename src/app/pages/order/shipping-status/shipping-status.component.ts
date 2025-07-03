import { Component, Input } from '@angular/core';
import { OrderStatus } from '../../../data/table.data';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { OrderCardInfo, OrderCardStatus } from '../../../data/card.data';

@Component({
  selector: 'app-shipping-status',
  imports: [MatIcon, CommonModule],
  templateUrl: './shipping-status.component.html',
  styleUrl: './shipping-status.component.css'
})
export class ShippingStatusComponent {
  @Input() orderStatus!: OrderCardInfo;

  statusSteps = [
    { id: 'Pendente', label: 'Preparação', icon: 'pallet', completed: false },
    { id: 'Em Trânsito', label: 'A caminho', icon: 'local_shipping', completed: false },
    { id: 'Entregue', label: 'Entregue', icon: 'home', completed: false }
  ];

  getStatusIndex(status: string): number {
    return this.statusSteps.findIndex(step => step.id === status);
  }

  getFormattedDate(dateString: string): { date: string, time: string } {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: '2-digit' }),
      time: date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
  }
}