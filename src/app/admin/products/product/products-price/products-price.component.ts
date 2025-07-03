import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-products-price',
  imports: [ CommonModule, FormsModule, MatSelectModule ],
  templateUrl: './products-price.component.html',
  styleUrl: './products-price.component.css'
})
export class ProductsPriceComponent {
  @Input() price!: any;
  @Input() price_type!: any;
  @Input() measures!: any;
  @Input() measureType: any;

  // Eventos de saída para notificar o componente pai
  @Output() priceTypeChange = new EventEmitter<string>();
  @Output() pricesUpdated = new EventEmitter<any>();
  @Output() measureChange = new EventEmitter<number>();
  @Output() measuresUpdate = new EventEmitter<any>();

  selectPriceType!: string;
  selectedMeasures!: number;

  unitaryValue: string = '';
  unitaryValueMeasure: string = '';

  boxValue: string = '';
  boxValueMeasure: string = '';

  constructor() {}

  ngOnInit(): void {
    this.selectPriceType = this.price_type.toString();
    this.selectedMeasures = this.measureType.toString();
  
    this.unitaryValue = this.price?.unitary || 0;
    this.unitaryValueMeasure = this.measures?.unitary || 0;

    this.boxValue = this.price?.box || 0;
    this.boxValueMeasure = this.measures?.box || 0;


    this.priceTypeChange.emit(this.selectPriceType);
  }
 
  emitPrices() {
    const pricesArray = { 'unitary': this.unitaryValue, 
      'box': this.boxValue};
    this.pricesUpdated.emit(pricesArray);
  }

  emitMeasures() {
    const measuresArray = {'unitary': this.unitaryValueMeasure,
      'box': this.boxValueMeasure
    };
    this.measuresUpdate.emit(measuresArray)
  }

  onSelectChange(event: any) {
    this.selectPriceType = event;
    this.priceTypeChange.emit(this.selectPriceType);
  }

  onSelectMesures(event: any){
    this.selectedMeasures = event;
    this.measureChange.emit(this.selectedMeasures);  
  }

  generatePrices(): boolean {
    return this.selectPriceType === "DUAL";
  }

  onInputChange(event: any, field: string) {
    this.formatCurrency(event.target.value, field);
  }

  private formatCurrency(value: string, field: string) {
    let cleanedValue = value.replace(/[^\d]/g, '');
    
    if (cleanedValue === '') cleanedValue = '0';
    
    const real = parseFloat(cleanedValue) / 100;
    
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(real);

    if (field == "unitary") {
        this.unitaryValue = formattedValue;
    }
    else if (field == "box") {
        this.boxValue = formattedValue;
    }
  }
}