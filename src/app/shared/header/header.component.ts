import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BtnIconComponent } from '../btn/btn-icon/btn-icon.component';

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

}