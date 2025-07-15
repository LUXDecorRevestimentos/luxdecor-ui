import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Topic, TopicType, TopicTypeLabels } from '../../../data/category.data';
import { TopicTableComponent } from './topic-table/topic-table.component';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-topic',
  imports: [TopicTableComponent, FormsModule, MatIcon, FormsModule, MatSelectModule, CommonModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {
  @Input() topics!: Topic[];
  @Output() topicEvent = new EventEmitter<[Topic, String]>();

  topicCurrent: Topic[] = [];
  selectedTopic!: Topic | null;
  selectedOption: number = 1;
  current_topic!: Topic;
  title!: string;
  resetTableSelectionFlag = false;

  ngOnInit(){
    this.topicCurrent = [...this.topics];
  }

  handleTopicSelection(topic: Topic){
    this.selectedTopic = topic;
    this.title = topic.title;
  }

  onSelectChange(event: any) {
    this.selectedOption = event;
  }


  saveTopic(){
    if (this.title.trim() && this.selectedTopic == null){
      let temporaryTopic: Topic = {
        topic_id: `#${Math.random().toString(36).substring(2, 10).padStart(8, '0')}`,
        title: this.title,
        topic_type: this.selectedOption,
        items: 0
      }
      this.topicEvent.emit([temporaryTopic, "add"]);
      this.clearInput()
    }
    else if(this.title.trim() && this.selectedTopic != null){
      this.selectedTopic.title = this.title;
      this.selectedTopic.topic_type = this.selectedOption;
      this.topicEvent.emit([this.selectedTopic, "update"]);
    }
  }
  
  deleteTopic(){
    if(this.selectedTopic){
      this.topicEvent.emit([this.selectedTopic, "remove"]);
      this.title = '';
    }
  }

  newTopic(){
    this.clearInput();
    this.selectedTopic = null;
    this.resetTableSelectionFlag = true;
    setTimeout(() => this.resetTableSelectionFlag = false, 0);
  }
  
  clearInput(){
    this.title = "";
  }


}
