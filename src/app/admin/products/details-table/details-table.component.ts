import { Component, Input } from '@angular/core';
import { Data, DetailsData } from '../../data/category.data';
import { CommonModule } from '@angular/common';
import { BarComponent } from '../../../shared/bar/bar.component';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-details-table',
  standalone: true,
  imports: [
    CommonModule, 
    BarComponent, 
    MatListModule, 
    MatIcon],
  templateUrl: './details-table.component.html',
  styleUrl: './details-table.component.css'
})
export class DetailsTableComponent {
  @Input() detailTable!: DetailsData;
  private hoveredIndex: number | null = null;

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
}