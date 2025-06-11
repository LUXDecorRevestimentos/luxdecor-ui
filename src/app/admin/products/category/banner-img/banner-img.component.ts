import { AnimateTimings } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

interface BannerImage {
  src: string;
  width: number;
  height: number;
  caption: string;
}

@Component({
  selector: 'app-banner-img',
  standalone: true,
  imports: [CommonModule, ImageCropperComponent],
  templateUrl: './banner-img.component.html',
  styleUrls: ['./banner-img.component.css']
})
export class BannerImgComponent implements OnChanges, OnInit {
  @Input() inputWidth: number = 1200;
  @Input() inputHeight: number = 240;
  @Input() bannerTitle: string = "";
  @Input() initialImage!: string;
  
  @Output() imageChanged = new EventEmitter<BannerImage>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  get cropConfig() {
    return {
      width: this.inputWidth,
      height: this.inputHeight,
      maintainAspectRatio: true,
      aspectRatio: this.inputWidth / this.inputHeight,
      freeCrop: false
    };
  }

  currentImage: any = this.createDefaultImage();
  showCropper = false;
  imageChangedEvent: any = '';
  croppedImage: Blob | string | null = null;
  instanceId = Math.random().toString(36).substring(2, 9);

  ngOnInit(): void {
    this.loadInitialImage(this.initialImage);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.initialImage){
      this.loadInitialImage(this.initialImage);
    }
    this.currentImage.src = this.initialImage
  }

  private createDefaultImage(): BannerImage {
    return {
      src: '',
      width: 0,
      height: 0,
      caption: this.bannerTitle
    };
  }

  private loadInitialImage(imageSrc: any) {
    if (imageSrc.src){
      const img = new Image();
      img.onload = () => {
        this.currentImage = {
          src: imageSrc,
          width: img.width,
          height: img.height
        };
        this.emitImage();
      };
      img.onerror = () => console.warn('Failed to load initial image');
      img.src = imageSrc.src;
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.value = '';
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    
    if (!fileInput.files || fileInput.files.length === 0) {
      this.resetImage();
      return;
    }

    const file = fileInput.files[0];
    this.imageChangedEvent = event;
    
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.onload = () => {
        this.currentImage = {
          src: e.target.result,
          file: file,
          width: img.width,
          height: img.height,
          caption: this.bannerTitle
        };
        this.emitImage();
      };
      img.onerror = () => console.error('Failed to load image');
      img.src = e.target.result;
    };
    reader.onerror = () => console.error('Failed to read file');
    reader.readAsDataURL(file);
  }

  openCropper() {
    if (this.currentImage.src) {
      this.showCropper = true;
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.blob || event.base64 || null;
  }

  async saveCrop() {
    if (!this.croppedImage) {
      this.showCropper = false;
      return;
    }

    try {
      let src: string;
      let file: File | null;

      if (this.croppedImage instanceof Blob) {
        src = await this.convertBlobToBase64(this.croppedImage);
        file = new File([this.croppedImage], 'cropped-banner.png', { type: 'image/png' });
      } else {
        src = this.croppedImage;
        file = null;
      }

      const img = new Image();
      img.onload = () => {
        this.currentImage = {
          src: src,
          file: file,
          width: img.width,
          height: img.height,
          caption: this.bannerTitle
        };
        this.emitImage();
      };
      img.onerror = () => console.error('Failed to load cropped image');
      img.src = src;

    } catch (error) {
      console.error('Error processing cropped image:', error);
    } finally {
      this.showCropper = false;
    }
  }

  cancelCrop() {
    this.croppedImage = null;
    this.showCropper = false;
  }

  toggleCropMode() {
    this.cropConfig.freeCrop = !this.cropConfig.freeCrop;
    this.cropConfig.maintainAspectRatio = !this.cropConfig.freeCrop;
  }

  resetImage() {
    this.currentImage = this.createDefaultImage();
    this.emitImage();
  }

  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private emitImage() {
    if (this.currentImage.width == 
      this.inputWidth && this.currentImage.height == this.inputHeight) {
        this.imageChanged.emit({...this.currentImage});
    }
  }
}