import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-modal-edit-client',
  templateUrl: './modal-edit-client.component.html',
  imports: [CommonModule,
    NgxMaskDirective,
    ReactiveFormsModule],
  styleUrls: ['./modal-edit-client.component.css']
})
export class ModalEditClientComponent implements OnInit {
  formGroup!: FormGroup;

  @Output() clientInfoUpdate: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalEditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clientInfo: any }
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      surname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      birth_date: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      rg: ['', Validators.required],
      cpf: ['', Validators.required]
    });

    if (this.data?.clientInfo) {
      this.formGroup.patchValue({
        name: this.data.clientInfo.name,
        surname: this.data.clientInfo.surname,
        birth_date: this.data.clientInfo.birth_date,
        email: this.data.clientInfo.contact?.email,
        phone: this.data.clientInfo.contact?.phone,
        rg: this.data.clientInfo.document?.rg,
        cpf: this.data.clientInfo.document?.cpf
      });
    }
  }

  // Proper form control getters
  get name() { return this.formGroup.get('name'); }
  get surname() { return this.formGroup.get('surname'); }
  get phone() { return this.formGroup.get('phone'); }
  get birth_date() { return this.formGroup.get('birth_date'); }
  get email() { return this.formGroup.get('email'); }
  get rg() { return this.formGroup.get('rg'); }
  get cpf() { return this.formGroup.get('cpf'); }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
      this.clientInfoUpdate.emit(this.formGroup.value)
    }
  }

  close() {
    this.dialogRef.close();
  }
}