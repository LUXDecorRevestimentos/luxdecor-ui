import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ClientService } from '../../service/client.service';
import { ClientLoginRequest } from '../../data/client.data';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login-admin',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIcon,
    RouterModule
  ],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent implements OnInit {

  @Output() authenticated = new EventEmitter<boolean>();

  formGroup!: FormGroup;
  isLoading  = false;

  constructor(private formBuilder: FormBuilder,
    private clientServie: ClientService,
    private router: Router,
    private authService: AuthService){}


  ngOnInit(): void {
    this.formGroup = this.createLoginForm()
  }

  createLoginForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  get email() { return this.formGroup.get('email'); }
  get password() { return this.formGroup.get('password');}

  onSubmit() {
    if (this.formGroup.invalid || this.isLoading) return;
  
    this.isLoading = true;
    const formData = this.formGroup.value;
    const requestData: ClientLoginRequest = {
      email: formData.email,
      password: formData.password
    };
  
    this.clientServie.loginClient(requestData).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.isLoading = false;
      }
    });
    this.isAdmin()
  }

  isAdmin(){
    this.authService.getClient().subscribe(response => {
      if(response){
        this.authenticated.emit(true)
      } else {
        this.authenticated.emit(false)
      }
    })
    
  }

}
