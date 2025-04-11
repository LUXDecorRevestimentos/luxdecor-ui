import { Component, Input } from '@angular/core';
import { Topic } from '../../../data/category.data';
import { TopicTableComponent } from './topic-table/topic-table.component';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-topic',
  imports: [TopicTableComponent, MatIcon, FormsModule, MatSelectModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {
  @Input() topics!: Topic[]; 

  selectedOption: string = 'Produtos';

  onSelectChange(event: any) {
    this.selectedOption = event;
  }
}
