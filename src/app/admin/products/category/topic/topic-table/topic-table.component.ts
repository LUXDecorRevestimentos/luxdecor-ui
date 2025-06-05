import { Component, Output, Input, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Topic, TopicTypeLabels, TopicType } from '../../../../data/category.data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-topic-table',
  imports: [CommonModule, MatTableModule],
  templateUrl: './topic-table.component.html',
  styleUrl: './topic-table.component.css'
})
export class TopicTableComponent implements OnChanges{
  private _topics: Topic[] = [];
  dataSource = new MatTableDataSource<Topic>();

  @Input() resetSelection: boolean = false;
  // @Input() topics!: Topic[];
  @Input()
  set topics(value: Topic[]) {
    this._topics = [...value];
    this.dataSource.data = this._topics;
  }
  get topics(): Topic[] {
    return this._topics;
  }

  displayedColumns: string[] = ['topic_id', 'title', 'topic_type', 'items'];

  @Output() rowSelected: EventEmitter<Topic> = new EventEmitter();
  selectedRow: Topic | null = null;

  ngOnChanges(changes: SimpleChanges){
    if (changes['topics']){}
    if (this.resetSelection){
      this.selectedRow = null;
    }
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
