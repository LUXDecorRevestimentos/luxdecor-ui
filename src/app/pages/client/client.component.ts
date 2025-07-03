import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../admin/service/auth.service';

@Component({
  selector: 'app-client',
  imports: [ RouterModule, CommonModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{

  authenticated: boolean = false;
  isAdmim: boolean = false;

  constructor (private clientService: ClientService, 
    private authService: AuthService,
    private router: Router){}

  ngOnInit(): void {
    this.clientService.clientStatus().subscribe(isAuthenticated => {
      this.authenticated = isAuthenticated;
      this.authService.getClient().subscribe(response => {
        if(response){
          this.isAdmim = true
        } else {
          this.isAdmim = false
        }
      })
      if (this.authenticated && !this.isAdmim) {
        this.router.navigate(['/info']);
      } else if (this.authenticated && this.isAdmim){
        this.router.navigate(['/admin']);
      } else {
        this.clientService.clientSignOut()
        this.router.navigate(['/client']);
      }
    });

    
  }

}
