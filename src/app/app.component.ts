import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from "./shared/footer/footer.component";
import { NotificationComponent } from './shared/notification/notification.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { Observable } from 'rxjs';
import { LoadingService } from './shared/loading/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIconModule,
    RouterOutlet,
    HeaderComponent,
    NotificationComponent,
    FooterComponent,
    LoadingComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'LuxRevestimentos';

  ngOnInit() {
    setTimeout(() => {
      console.log("Iniciando teste de loading...");
      this.loadingService.show();
    }, 0); 

    setTimeout(() => {
      this.loadingService.hide();
      console.log("Teste de loading finalizado.");
    }, 3000); 
  }

  get isLoading$(): Observable<boolean> {
    return this.loadingService.isLoading$;
  }

  

  constructor(private loadingService: LoadingService){} 

}