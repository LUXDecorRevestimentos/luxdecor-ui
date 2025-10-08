import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentCard } from '../../../../data/payment.data';

@Component({
  selector: 'app-card',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './modal-card.component.html',
  styleUrl: './modal-card.component.css'
})
export class ModalCardComponent implements OnInit {

  formGroup!: FormGroup;

  @Output() cardDataUpdate: EventEmitter<PaymentCard> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cardData: any }
  ){}

  ngOnInit(): void {
    this.createCardForm();
  }

  createCardForm(): void {
    this.formGroup  = this.formBuilder.group({
      holder: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]+$/)
      ]],
      cardNumber: ['', [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(19),
        Validators.pattern(/^\d+$/)
      ]],
      expiryMonth: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(12),
        Validators.pattern(/^\d{2}$/)
      ]],
      expiryYear: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(/^\d{4}/)
      ]],
      cvv: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
        Validators.pattern(/^\d+$/)
      ]]
    }, {
      validators: this.expiryDateValidator('expiryMonth', 'expiryYear')
    });
  }

  expiryDateValidator(monthControlName: string, yearControlName: string): ValidatorFn {
    return (form: AbstractControl): { [key: string]: any } | null => {
      const month = form.get(monthControlName)?.value;
      const year = form.get(yearControlName)?.value;

      if (!month || !year || month.length !== 2 || year.length !== 4) {
        return null;
      }

      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth() + 1;

      const expYear = parseInt(year, 10);
      const expiryMonth = parseInt(month, 10);

      if (expYear < currentYear) {
            return { 'expiredCard': true };
      }

      if (expYear === currentYear && expiryMonth < currentMonth) {
          return { 'expiredCard': true };
      }

      return null;
    }
  }
  get holder() { return this.formGroup.get('holder'); }
  get cardNumber() { return this.formGroup.get('cardNumber'); }
  get expMonth() { return this.formGroup.get('expiryMonth'); }
  get expYear() { return this.formGroup.get('expiryYear'); }
  get cvv() { return this.formGroup.get('cvv'); }

  formatCardNumber(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;

    let cleanedValue = inputValue.replace(/\D/g, '');

    const maxDigits = 16;
    if (cleanedValue.length > maxDigits) {
      cleanedValue = cleanedValue.substring(0, maxDigits);
    }

    let formattedValue = '';
    for (let i = 0; i < cleanedValue.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedValue += ' ';
      }
      formattedValue += cleanedValue[i];
    }
    inputElement.value = formattedValue;
    this.cardNumber!.patchValue(cleanedValue, { emitEvent: false });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;

      let holderData = {
        name: formData.holder
      }

      let paymentCard: PaymentCard = {
        holder: holderData,
        number: formData.cardNumber,
        cvv: formData.cvv,
        expMonth: formData.expiryMonth,
        expYear: formData.expiryYear
      };

      this.dialogRef.close(this.formGroup.value);
      this.cardDataUpdate.emit(paymentCard)
 
    } else {
      console.log('Formulário Inváido!');
      this.formGroup.markAllAsTouched();
    }
  }

  close() {
    this.dialogRef.close();
  }

}
