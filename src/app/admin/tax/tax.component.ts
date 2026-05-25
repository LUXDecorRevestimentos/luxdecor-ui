import { Component, computed, inject, Inject, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CardDataComponent } from '../components/card-data/card-data.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaxInfo } from '../data/tax.data';
import { MatSelectModule } from '@angular/material/select';
import { BarComponent } from '../../shared/bar/bar.component';
import { InstallmentTableComponent } from '../../pages/payment-page/finally-page/installment-table/installment-table.component';
import { BtnComponent } from '../components/btn/btn.component';
import { TaxAuthService } from '../service/tax.auth.service';


@Component({
  selector: 'app-tax',
  imports: [
    MatIcon,
    CardDataComponent,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    BarComponent,
    InstallmentTableComponent,
    BtnComponent
  ],
  templateUrl: './tax.component.html',
  styleUrl: './tax.component.css'
})
export class TaxComponent implements OnInit {

  timeUpdate: string = "10:10 01/08/2025";
  selectedOption: string = "0";

  taxValue: number = 0;
  criteriaValue: number = 0;
  minValue: number = 0;
  maxValue: number = 0;

  discount_total: string | null = null;
  discount: number = 0;
  totalPrice: string | undefined;

  teste_value: number = 0;
  total_value: number = 0;

  pix_tax!: number;
  credit_tax!: number;
  boleto_tax!: number;

  reload: boolean = false;


  constructor(private fb: FormBuilder,
    private taxService: TaxAuthService
  ) {}
  // taxInfoList
  // 1 - PIX
  // 2 - CREDIT_CARD
  // 3 - BOLETO

  taxInfoList: TaxInfo[] = [];

  formGroup!: FormGroup;


  ngOnInit(): void {
    this.loadTax()
    this.initForm() 
  }

  loadTax(){
    this.taxService.getTaxList().subscribe((data: any) => {
      this.taxInfoList = data;
      this.pix_tax = this.taxInfoList[0].rate_percentage
      this.credit_tax = this.taxInfoList[1].rate_percentage
      this.boleto_tax = this.taxInfoList[2].rate_percentage
    })
   

    if (this.selectedOption == "1") {
      this.minValue = this.taxInfoList[0].range_start
      this.maxValue = this.taxInfoList[0].range_end
      this.taxValue = this.taxInfoList[0].rate_percentage
    }
    if (this.selectedOption == "2"){
      this.updateConditionalValidators()
      this.minValue = this.taxInfoList[1].range_start
      this.maxValue = this.taxInfoList[1].range_end
      this.taxValue = this.taxInfoList[1].rate_percentage
    }
    if (this.selectedOption == "3"){
      this.updateConditionalValidators()
      this.minValue = this.taxInfoList[2].range_start
      this.maxValue = this.taxInfoList[2].range_end
      this.taxValue = this.taxInfoList[2].rate_percentage
    }
    this.reload = true;
  }

  onSelectChange(event: any) {
    this.loadTax();
    this.selectedOption = event;
  }

  initForm() {
    this.formGroup = this.fb.group({
      type: ['', Validators.required],
      tax: [null as number | null, [Validators.required, Validators.min(0)]],
      min: [null as number | null, [Validators.min(1)]],
      max: [null as number | null, [Validators.min(1)]]
    });
  }

  updateConditionalValidators() {
    const minControl = this.formGroup.get('min');
    const maxControl = this.formGroup.get('max');

    if (this.selectedOption == '1') {
      minControl?.setValidators([Validators.required, Validators.min(1)]);
      minControl?.setValidators([Validators.required, Validators.min(1)]);
    } else {
      minControl?.clearValidators();
      maxControl?.clearValidators();

      minControl?.setValue(null, { emitEvent: false })
      maxControl?.setValue(null, { emitEvent: false })
    }
    maxControl?.updateValueAndValidity({ emitEvent: false })
    minControl?.updateValueAndValidity({ emitEvent: false })
  }

  get type() { return this.formGroup.get('type'); }
  get tax() { return this.formGroup.get('tax'); }
  get min() { return this.formGroup.get('min'); }
  get max() { return this.formGroup.get('max'); }

  isCreditCard(){
    if (this.selectedOption == "2") {
      return true;
    }
    return false;
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const data = this.formGroup.value;
      const messageElement = document.getElementById('submissionMessage');
      if (messageElement) {
        messageElement.classList.remove('hidden');
        setTimeout(() => messageElement.classList.add('hidden'), 4000);
      }
      this.formGroup.reset({ type: '', tax: null, min: null, max: null });
      this.timeUpdate = new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleDateString('pt-BR')
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  onDiscount() {
    if (!this.totalPrice) return; 

    let valorNumerico: number = parseFloat(this.totalPrice.replace(',', '.'));

    if (isNaN(valorNumerico)) {
      console.error("Erro: O valor do produto não é um número válido.");
      return;
    }
    
    let valorDoDescontoAplicado: number = 0;
    
    if (this.selectedOption !== "2") {
      valorDoDescontoAplicado = (valorNumerico * this.discount) / 100;
      this.discount = valorDoDescontoAplicado; 
      
      this.discount_total = valorDoDescontoAplicado.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    } else {
        this.discount = 0; 
        this.discount_total = "R$ 0,00";
    }
    const precoFinal: number = valorNumerico - valorDoDescontoAplicado;
    this.total_value = precoFinal;
    this.totalPrice = precoFinal.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  onSave() {
    // console.log(this.selectedOption,
    //   this.taxValue,
    //   this.minValue,
    //   this.maxValue,
    // )
    let method = "" 
    if (this.selectedOption == "1"){
      method = "PIX"
    } if (this.selectedOption == "2"){
      method = "CREDIT_CARD"
    } if (this.selectedOption == "3") {
      method = "BOLETO"
    }

    const taxBody: TaxInfo = {
      payment_method: method,
      range_end: this.maxValue,
      range_start: this.minValue,
      created_at: "",
      range_criteria: 0,
      rate_percentage: this.taxValue 
    }
    this.taxService.saveTax(taxBody).subscribe()
  }

  emitTax() {
    this.onDiscount();
  }
  emitCriteria() {
    this.onDiscount();
  }
  emitMax() {
    this.onDiscount();
  }
  emitMin() {
    this.onDiscount();
  }

  emitTeste() {
    this.onDiscount();
  }

}
