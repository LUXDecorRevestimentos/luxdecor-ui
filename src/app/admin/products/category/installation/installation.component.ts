import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Installation } from '../../../data/category.data';
import { BannerService } from '../../../service/banner.auth.service';
import { BannerImgComponent } from '../banner-img/banner-img.component';
import { InstallationTableComponent } from './installation-table/installation-table.component';

@Component({
  selector: 'app-installation',
  imports: [
    CommonModule,
    MatIcon,
    FormsModule,
    BannerImgComponent,
    InstallationTableComponent
  ],
  templateUrl: './installation.component.html',
  styleUrl: './installation.component.css'
})
export class InstallationComponent {

  @Input() installations!: Installation[];
  @Output() installationEvent = new EventEmitter<[Installation, String]>();

  constructor (private bannerService: BannerService) {}

  title!: string;
  value!: string;
  selectedInstallation!: Installation | null;
  currentInstallation: Installation[] = [];
  installationBanner: any;
  resetTableSelectionFlag = false;
  installationValue: string = "";

  ngOnInit(){
    this.currentInstallation = [...this.installations];
    console.log(this.installations)
  }

  handleInstallationSelection(installation: Installation){
    this.selectedInstallation = installation;
    this.title = installation.title;
    this.value = installation.price;
    this.handleGetInstallationBanner(this.selectedInstallation)
  }

  handleInstallationChange(img: any){
    this.onUploadImgs(img)
  }

  handleGetInstallationBanner(installation: Installation){
    this.bannerService.getImgs(installation.banner_id).subscribe((data) => {
      this.installationBanner = data
    })
  }

  onInputChange(event: any) {
    this.formatCurrency(event.target.value);
  }
  
  private formatCurrency(value: string) {
    let cleanedValue = value.replace(/[^\d]/g, '');
    
    if (cleanedValue === '') cleanedValue = '0';
    
    const real = parseFloat(cleanedValue) / 100;
    
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(real);
    this.installationValue = formattedValue;
  }

  saveInstallation(){
    console.log(this.installationValue)
    if (this.title.trim() && this.selectedInstallation == null){
      let temporaryInstallation: Installation = {
        installation_id: `#${Math.random().toString(36).substring(2, 10).padStart(8, '0')}`,
        title: this.title,
        banner_id: "",
        price: this.installationValue
    }
      this.installationEvent.emit([temporaryInstallation, "add"]);
      this.clearInput()
    }
    else if(this.title.trim() && this.selectedInstallation != null){
      this.selectedInstallation.title = this.title;
      this.selectedInstallation.price = this.installationValue;
      this.installationEvent.emit([this.selectedInstallation, "update"]);
    }
  }

  deleteInstallation(){
    if (this.selectedInstallation){
      this.installationEvent.emit([this.selectedInstallation, "remove"]);
      this.title = "";
    }
  }

  newInstallation(){
    this.clearInput();
    this.selectedInstallation = null;
    this.resetTableSelectionFlag = true;
    setTimeout(() => this.resetTableSelectionFlag = false, 0);
  }

  emitPrices() {
    // this..emit(pricesArray);
  }

  onUploadImgs(imgs: any): void {
    let installation_id = this.selectedInstallation?.installation_id
    let banner_id = this.selectedInstallation?.banner_id
    if (installation_id && banner_id) {
      this.bannerService.uploadImgs(imgs, installation_id, banner_id).subscribe({
        next: response => {},
        error: error => console.error('Error updating brand:', error)
      });
    }
  }

  clearInput(){
    this.title = '';    
  }
}
