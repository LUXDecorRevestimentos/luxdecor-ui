import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Topic, TopicTypeLabels, TopicType } from '../../../../data/category.data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-topic-table',
  imports: [CommonModule, MatTableModule],
  templateUrl: './topic-table.component.html',
  styleUrl: './topic-table.component.css'
})
export class TopicTableComponent {

  @Input() topics!: Topic[];
  @Output() rowSelected: EventEmitter<Topic> = new EventEmitter();
  displayedColumns: string[] = ['topicId', 'topicName', 'topicType', 'items'];
  dataSource = new MatTableDataSource<Topic>();
  selectedRow: Topic | null = null;

  constructor() {}

  ngOnInit(): void {
    this.dataSource.data = this.topics;
  }
  
  onRowClicked(topic: Topic): void {
    this.selectedRow = topic;
    this.rowSelected.emit(topic);
  }


  getLabelStatus(topicType: TopicType): string {
    let topicTypeLabel: string = "";
    if ( topicType && topicType !== undefined) {
      topicTypeLabel = TopicTypeLabels[topicType] || 'Unknown Status';
    }
    return topicTypeLabel;
  }

}
