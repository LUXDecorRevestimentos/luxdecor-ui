import { Component, OnInit } from '@angular/core';
import { SectionService } from '../service/section.service';
import { GenericSection } from '../data/card.data';
import { CommonModule } from '@angular/common';
import { CarouselCardsComponent } from '../shared/carousel-cards/carousel-cards.component';

@Component({
  selector: 'app-featured-promotions',
  imports: [CommonModule, CarouselCardsComponent],
  templateUrl: './featured-promotions.component.html',
  styleUrl: './featured-promotions.component.css'
})
export class FeaturedPromotionsComponent {
  title: string = '';
  type: string = '';
  countComponents: string = '';
  cardsContent: any[] = [];
  cardsCategory: any[] = [];
  cardsProduct: any[] = [];

  constructor(private sectionService: SectionService){}

  ngOnInit(): void {
    this.sectionService.getSections().subscribe((sections: GenericSection[]) => {
      this.title = sections[0].title;
      this.type = sections[0].type;
      this.countComponents = sections[0].data.length;
      

      console.log(
        "title=" + this.title + 
        " type=" + this.type + 
        " components=" + this.countComponents);
      console.log(JSON.stringify(sections[0]));
      this.cardsContent = this.cardsContent.concat(sections[0].data);
      this.getSectionCategory()
      this.getSectionProduct()
    })
  }

  getSectionCategory() {
    const cardsCategory = this.cardsContent.filter(item => item.type === 'card-category');
    
    this.cardsCategory = [...this.cardsCategory, ...cardsCategory.flatMap(category => category.data)];
    
    console.log('Categorias encontradas:', this.cardsCategory);
  }
  
  getSectionProduct(){
    const cardsProduct = this.cardsContent.filter(item => item.type === 'card-product');
    
    this.cardsProduct = [...this.cardsProduct, ...cardsProduct.flatMap(product => product.data)];
    console.log(this.cardsProduct)
  }

}
