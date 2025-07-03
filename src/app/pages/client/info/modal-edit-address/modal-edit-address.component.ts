import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientInfoResponse } from '../../../../data/client.data';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-modal-edit-address',
  imports: [CommonModule, NgxMaskDirective, ReactiveFormsModule],
  templateUrl: './modal-edit-address.component.html',
  styleUrl: './modal-edit-address.component.css'
})
export class ModalEditAddressComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalEditAddressComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: {
      clientInfo: ClientInfoResponse;
    }) {
      this.initForm();
  }
  
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.fb.group({
      street: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ú\s']+$/)]],
      number: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      postal_code: ['', [Validators.required]],
    });

    if (this.data?.clientInfo?.address) {
      this.formGroup.patchValue({
        street: this.data.clientInfo.address.street,
        number: this.data.clientInfo.address.number,
        postal_code: this.data.clientInfo.address.postal_code,
      });
    }
  }

  get streetControl() { return this.formGroup.value.street; }
  get numberControl() { return this.formGroup.value.number; }
  get postalCodeControl() { return this.formGroup.value.postal_code; }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
