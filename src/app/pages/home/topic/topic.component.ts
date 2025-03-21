import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedPromotionsComponent } from '../../../shared/featured-promotions/featured-promotions.component'
import { SectionService } from '../../../service/section.service';
import { GenericSection } from '../../../data/card.data';
import { GalleryComponent } from '../../../shared/gallery/gallery.component';
import { BarComponent } from '../../../shared/bar/bar.component';
import { BtnCallComponent } from '../../../shared/btn/btn-call/btn-call.component';

@Component({
  selector: 'app-topic',
  imports: [CommonModule, FeaturedPromotionsComponent, GalleryComponent, BarComponent, BtnCallComponent],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {

  cardsContent: any[] = [];
  cardsProduct: any[] = [];
  sections: any[] = [];
  @Input() type: string = "";


  constructor(private sectionService: SectionService){}

  ngOnInit(): void {
    this.sectionService.getSections().subscribe((sections: GenericSection[]) => {
      sections.forEach(section => {
        this.sections.push(section);
      })
    })
  }
}
