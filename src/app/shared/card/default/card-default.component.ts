import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from '../../pipe/img-url.pipe';

@Component({
  selector: 'app-card',
  imports: [CommonModule, ImgUrlPipe],
  templateUrl: './card-default.component.html',
  styleUrls: ['./card-default.component.css']
})
export class CardComponent {
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() type: string = '';
  @Input() data?: any;

}