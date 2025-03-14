import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturedPromotionsComponent } from '../../../shared/featured-promotions/featured-promotions.component'
import { SectionService } from '../../../service/section.service';
import { GenericSection } from '../../../data/card.data';
import { GalleryComponent } from '../../../shared/gallery/gallery.component';


@Component({
  selector: 'app-topic',
  imports: [CommonModule, FeaturedPromotionsComponent, GalleryComponent],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {

  cardsContent: any[] = [];
  cardsProduct: any[] = [];
  sections: any[] = [];

  constructor(private sectionService: SectionService){}

  ngOnInit(): void {
    this.sectionService.getSections().subscribe((sections: GenericSection[]) => {
      sections.forEach(section => {
        this.sections.push(section);
      })
    })
  }
}
