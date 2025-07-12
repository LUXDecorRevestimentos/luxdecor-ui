import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ClientService } from '../../../service/client.service';
import { ClientLoginRequest } from '../../../data/client.data';
import { NotificationService } from '../../../service/notification.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIcon,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  isLoading = false;

  constructor(private formBuilder: FormBuilder,
    private clientService: ClientService, private router: Router,
    private notificationService: NotificationService) {}
  
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
  
    this.clientService.loginClient(requestData).subscribe({
      next: () => {
        this.notificationService.show('Seja bem-vindo!', 'success');
        this.router.navigate(['/home']);
        this.isLoading = false;
      },
      error: (err) => {
        this.notificationService.show('Ocorreu um erro durante o login!', 'error');
        this.isLoading = false;
      }
    });
  }
}
