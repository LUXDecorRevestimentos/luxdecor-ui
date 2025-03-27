import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BtnIconComponent } from '../btn/btn-icon/btn-icon.component';
import { MatDialog } from '@angular/material/dialog';
import { CartPageComponent } from '../../pages/cart-page/cart-page.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatIconModule, RouterModule, BtnIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  navItems = [
    { label: 'PISO', route: 'piso' },
    { label: 'RODAPE', route: 'rodape' },
    { label: 'PAINEIS RIPADOS', route: 'paineis-ripados' },
    { label: 'CAMAS E COLCHOES', route: 'camas-e-colchoes' },
    { label: 'OUTROS PRODUTOS', route: 'outros-produtos' },
    { label: 'SERVICOS', route: 'servicos' }
  ];

  constructor(public dialog: MatDialog) {}

  openCart(): void {
    const dialogRef = this.dialog.open(CartPageComponent, {
      width: '500px',
      data: { /* dados que você quer passar para o modal */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal fechado', result);
    });
  }

}