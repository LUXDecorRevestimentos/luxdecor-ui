import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Data, DetailsData } from '../../data/category.data';
import { CommonModule } from '@angular/common';
import { BarComponent } from '../../../shared/bar/bar.component';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { __makeTemplateObject } from 'tslib';

@Component({
  selector: 'app-details-table',
  imports: [
    CommonModule, 
    BarComponent, 
    MatListModule, 
    MatIcon,
    FormsModule
  ],
  templateUrl: './details-table.component.html',
  styleUrl: './details-table.component.css'
})
export class DetailsTableComponent implements OnChanges {

  selectedRow: Data | null = null;

  private _details: DetailsData = { title: '', data: [] };
  private _resetSelection: boolean = false;
  
  detailTable: DetailsData = { title: '', data: [] };

  @Input()
  set detailInput(value: DetailsData) {
    this._details = {
      title: value.title,
      data: [...value.data]
    };
    this.detailTable = this._details
  }
  get detailInput(): DetailsData {
    return this._details;
  }

  // @Input() detailTable!: DetailsData;
  @Input() editable: boolean = false;

  @Output() allInputsFilled = new EventEmitter<DetailsData>();
  @Output() saveRequested = new EventEmitter<[Data, String, String]>();

  @ViewChildren('detailInput') detailInputs!: QueryList<ElementRef>;
  @ViewChild('newItemInput') newItemInput!: ElementRef;

  key!: string;

  private hoveredIndex: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['detailTable']){}
  }

  onMouseEnter(index: number): void {
    this.hoveredIndex = index;
  }

  onMouseLeave(): void {
    this.hoveredIndex = null;
  }

  isHovered(index: number): boolean {
    return this.hoveredIndex === index;
  }

  moveItem(index: number, direction: 'up' | 'down'): void {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < this.detailTable.data.length) {
      [this.detailTable.data[index], this.detailTable.data[newIndex]] = 
      [this.detailTable.data[newIndex], this.detailTable.data[index]];
    }
  }

  moveItemUp(index: number): void {
    this.moveItem(index, 'up');
  }

  moveItemDown(index: number): void {
    this.moveItem(index, 'down');
  }

  saveChanges(): void {
    if (this.key.trim() && this.selectedRow == null){
      let data: Data = {
        data_id: `#${Math.random().toString(36).substring(2, 10).padStart(8, '0')}`,
        key: this.key,
        value: ""
      }
      this.saveRequested.emit([data, "add", this.detailTable.title.toLowerCase()]);
      this.clearInput()
    }
    else if (this.key.trim() && this.selectedRow != null){
      this.selectedRow.key = this.key;
      this.saveRequested.emit([this.selectedRow, "update", this.detailTable.title.toLowerCase()])
    }
  }

  onRowClicked(row: Data): void {
    this.selectedRow = row;
  }

  deleteDetail(){
    if (this.selectedRow)
      this.saveRequested.emit([this.selectedRow, "remove", this.detailTable.title.toLowerCase()]);
      this.key = '';
  }

  newDetail(){
    this.clearInput()
    this.selectedRow = null
    this._resetSelection = true;    
    setTimeout(() => this._resetSelection = false, 0);
  }

  onInputChange(index: number, event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.detailTable.data[index].value = inputValue;
    this.checkAllInputsFilled();
  }

  checkAllInputsFilled(): void {
    this.detailTable.data.every(item => item.value.trim() !== '');
  }

  clearInput(){
    this.key = '';
  }

  clearAll(): void {
    this.detailTable.data = [];
    if (this.newItemInput) {
      this.newItemInput.nativeElement.value = '';
    }
  }
}