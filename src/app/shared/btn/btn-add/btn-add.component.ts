import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-btn-add',
  imports: [MatIconModule],
  templateUrl: './btn-add.component.html',
  styleUrl: './btn-add.component.css'
})
export class BtnAddComponent {

  @Input() productId!: string;
  @Output() order: EventEmitter<[string, number]> = new EventEmitter();

  count: number = 1;

  increment() {
    this.count++;
  }

  decrement() {
    if (this.count > 1) {
      this.count--;
    }
  }

  updateCount(event: Event) {
    const input = event.target as HTMLInputElement;
    const newValue = parseInt(input.value, 10);

    if (!isNaN(newValue)){
      this.count = newValue;
    } else {
      this.count = 1;
    }
  }

  onClick(){
    this.order.emit([this.productId, this.count])
  }
}
