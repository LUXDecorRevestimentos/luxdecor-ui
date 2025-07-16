import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClientService } from '../../../service/client.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardInfoComponent } from './card-info/card-info.component';
import { BarComponent } from '../../../shared/bar/bar.component';
import { CardDeliveryComponent } from './card-delivery/card-delivery.component';
import { CardOrdersComponent } from './card-orders/card-orders.component';
import { ClientInfoResponse } from '../../../data/client.data';
import { WhatsappComponent } from '../../../shared/whatsapp/whatsapp.component';

@Component({
  selector: 'app-info',
  imports: [RouterModule,
    CommonModule,
    CardInfoComponent,
    BarComponent,
    CardOrdersComponent,
    CardDeliveryComponent,
    WhatsappComponent
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent implements OnInit, OnDestroy  {

  clientData!: ClientInfoResponse | undefined;

  private authSub: Subscription = Subscription.EMPTY;

  constructor(private clientService: ClientService,
      private router: Router) {}

  onSignOut(){
    this.clientService.clientSignOut()
  }

  ngOnInit(): void {
    this.authSub = this.clientService.clientStatus().subscribe(isAuthenticated => {
      if (!isAuthenticated) {
        this.router.navigate(['/']);
      }
    });
    if (!this.clientService.clientStatus()) {
      this.router.navigate(['/']);
    }
    this.fetchClient()
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  signOut(){
    this.clientService.clientSignOut()
  }

  onUpdateInfo($event: any){
    this.clientService.updateClient($event).subscribe(() => {
      this.clientData = undefined
      this.fetchClient()
    })
  }

  onUpdateAddress($event: any){
    this.clientService.updateAddress($event).subscribe(() => {
      this.clientData = undefined
      this.fetchClient()
    })
  }

  fetchClient() {
    this.clientService.getClient().subscribe(
      (response) => {
        this.clientData = response;
      },
      (error) => {
        this.router.navigate(['/client']);
      }
    );
  }

}
