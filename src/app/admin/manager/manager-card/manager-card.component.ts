import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { AdminData } from '../../data/admin.data';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-manager-card',
  imports: [ FormsModule,
    MatSelectModule,
    CommonModule,
    NgxMaskDirective,
    ReactiveFormsModule],
  templateUrl: './manager-card.component.html',
  styleUrl: './manager-card.component.css'
})
export class ManagerCardComponent implements OnInit{
  formGroup!: FormGroup;

  @Input() adminInfo!: AdminData;
  @Output() updateAdmin = new EventEmitter<AdminData>();

  constructor(
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    console.log(this.adminInfo)
    this.initForm()
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      surname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

    if (this.adminInfo) {
      this.formGroup.patchValue({
        name: this.adminInfo.name,
        surname: this.adminInfo.surname,
        created_at: this.adminInfo.created_at,
        email: this.adminInfo.email,
        phone: this.adminInfo.phoneNumber
      });
    }
  }

  get name() { return this.formGroup.get('name'); }
  get surname() { return this.formGroup.get('surname'); }
  get phone() { return this.formGroup.get('phone'); }
  get birth_date() { return this.formGroup.get('created_at'); }
  get email() { return this.formGroup.get('email'); }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      const updatedAdmin: AdminData = {
        adminId: this.adminInfo?.adminId || '',
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phoneNumber: formData.phone,
        created_at: this.adminInfo?.created_at || new Date().toISOString()
      };
      
      console.log('Dados enviados:', updatedAdmin);
      this.updateAdmin.emit(updatedAdmin);
    } else {
      console.warn('Formulário inválido');
      this.markAllAsTouched();
    }
  }
  
  private markAllAsTouched(): void {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }

}
