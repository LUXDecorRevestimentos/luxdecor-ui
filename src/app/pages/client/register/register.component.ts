import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { ClientRegisterRequest } from '../../../data/client.data';
import { ClientService } from '../../../service/client.service';
import { NotificationService } from '../../../service/notification.service';
import { Router } from '@angular/router';



@Component({
  standalone: true,
  selector: 'app-register',
  imports: [
    NgxMaskDirective,
    CommonModule,
    ReactiveFormsModule,
    MatIcon,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;
  maxDate!: string|number|Date;

  isLoading = false;
  message = "";
  isSuccess = false;

  constructor(private formBuilder: FormBuilder,
    private clientService: ClientService,
    private notificationService: NotificationService,
    private router: Router ) {}

  ngOnInit(){
    this.formGroup = this.createRegisterForm()
  }

  createRegisterForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ú\s']+$/)]],
      surname: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ú\s']+$/)]],
      postal_code: ['', [Validators.required]],
      number: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      street: ['', [Validators.required]],
      complement: [''],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.patternValidator(/\d/, { hasNumber: true }),
        this.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        this.patternValidator(/[a-z]/, { hasSmallCase: true }),
        this.patternValidator(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { hasSpecialCharacters: true })
      ]],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      birth_date: ['', [Validators.required, this.validateAge(18)]]
    });
  }
  private patternValidator(regex: RegExp, error: Record<string, boolean>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  get password() {
    return this.formGroup.get('password');
  }

  validateAge(minAge: number) {
    return (control: any) => {
      if (!control.value) {
        return null;
      }
      
      const birthDate = new Date(control.value);
      const today = new Date();
      
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age >= minAge ? null : { underage: { requiredAge: minAge } };
    };
  }

  onSubmit() {
    const formData = this.formGroup.value;
    const streetWithComplement = formData.complement 
      ? `${formData.street} - ${formData.complement}` 
      : formData.street;
   
    if (this.formGroup.valid) {
      const requestData: ClientRegisterRequest = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        birth_date: formData.birth_date,
        document: {
          rg: formData.rg,
          cpf: formData.cpf
        },
        contact: {
          phone: formData.phone,
          email: formData.email
        },
        address: {
          address_id: '',
          number: formData.number,
          street: streetWithComplement,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postal_code,
        }
      };
      this.clientService.registerClient(requestData).subscribe({
      next: () => {
        this.isLoading = false;
        this.formGroup.reset();
        this.notificationService.show('Registrado com sucesso!', 'success');
        this.router.navigate(['/client']);
      },
      error: (err) => {
        this.isLoading = false;
        this.notificationService.show('Ocorreu um erro durante seu cadastro!', 'error');
      }
    });
  } else {
    this.formGroup.markAllAsTouched();
  }
  }

  get name() { return this.formGroup.get('name'); }
  get surname() { return this.formGroup.get('surname'); }
  get email() { return this.formGroup.get('email'); }
  get birth_date() { return this.formGroup.get('birth_date'); }
}
