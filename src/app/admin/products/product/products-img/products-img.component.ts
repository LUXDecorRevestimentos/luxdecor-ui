import { Component, EventEmitter, Output, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-products-img',
  imports: [ CommonModule, MatIcon ],
  templateUrl: './products-img.component.html',
  styleUrl: './products-img.component.css'
})
export class ProductsImgComponent implements OnInit, OnChanges{

  @Input() productImgs: any[] = [];

  @Output() imagesChanged = new EventEmitter<any[]>();

  images = [
    { id: 0, src: '', thumb: '', caption: 'Imagem Principal', file: null },
    { id: 1, src: '', thumb: '', caption: 'Imagem 1', file: null },
    { id: 2, src: '', thumb: '', caption: 'Imagem 2', file: null },
    { id: 3, src: '', thumb: '', caption: 'Imagem 3', file: null },
    { id: 4, src: '', thumb: '', caption: 'Imagem 4', file: null }
  ];

  constructor(private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.productImgs){
      this.updateImages(this.productImgs)
    }
  }

  selectedImage = this.images[0];

  updateImages(receivedImages: any[]) {
    this.images = this.images.map(existingImage => {
      const receivedImg = receivedImages.find(img => Number(img.id) === existingImage.id);
      return receivedImg 
        ? { ...existingImage, src: receivedImg.src }
        : existingImage;
    });
    this.cdr.detectChanges();
  }

  private emitImages() {
    this.imagesChanged.emit(this.images);
  }

  selectImage(image: any) {
    this.selectedImage = image;
  }

  onFileChange(event: any, imageId: number) {
    const fileInput = event.target;
    
    if (fileInput.files.length === 0) {
      this.removeImage(imageId);
      return;
    }

    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = (e: any) => {
        this.images[imageId] = {
          id: imageId,
          src: e.target.result,
          thumb: e.target.result,
          caption: imageId === 0 ? 'Imagem Principal' : `Imagem ${imageId}`,
          file: file
        };

        if (this.selectedImage.id === imageId) {
          this.selectedImage = this.images[imageId];
        }
        this.emitImages();
      };
      
      reader.readAsDataURL(file);
    }
  }

  removeImage(imageId: number) {
    this.images[imageId] = {
      id: imageId,
      src: '',
      thumb: '',
      caption: imageId === 0 ? 'Imagem Principal' : `Imagem ${imageId}`,
      file: null
    };

    if (this.selectedImage.id === imageId) {
      this.selectedImage = this.images[imageId];
    }
  }

  triggerFileInput(imageId: number) {
    const fileInput = document.getElementById(`file-input-${imageId}`) as HTMLInputElement;
    fileInput.value = '';
    fileInput.click();
  }
  
  triggerRemoveFile(imageId: number) {
    this.images[imageId] = {
      id: imageId,
      src: '',
      thumb: '',
      caption: imageId === 0 ? 'Imagem Principal' : `Imagem ${imageId}`,
      file: null
    };

    if (this.selectedImage.id === imageId) {
      this.selectedImage = this.images[imageId];
    }
  }

  changeAllImages() {
    this.images = this.images.map((img, index) => ({
      id: index,
      src: '',
      thumb: '',
      caption: index === 0 ? 'Imagem Principal' : `Imagem ${index}`,
      file: null
    }));
    this.selectedImage = this.images[0];
    this.emitImages();
  }
}