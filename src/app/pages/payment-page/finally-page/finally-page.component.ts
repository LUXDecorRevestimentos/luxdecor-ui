import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from '../../../shared/bar/bar.component';
import { BtnContinueComponent } from '../../../shared/btn/btn-continue/btn-continue.component';
import { ClientCardComponent } from '../../../shared/client-card/client-card.component';
import { CartCardComponent } from '../../../shared/cart-card/cart-card.component';
import { MethodPaymentCardComponent } from '../method-payment-card/method-payment-card.component'; 
import { MethodShippingCardComponent } from '../method-shipping-card/method-shipping-card.component';
import { Cart, CartCardItemData, InstallOption, PaymentMethodType } from '../../../data/card.data';
import { ClientInfoResponse } from '../../../data/client.data';
import { WhatsappComponent } from '../../../shared/whatsapp/whatsapp.component';
import { PaymentService } from '../../../service/payment.service';
import { SaleDataCart } from '../../../data/payment.data';
import { PixComponent } from './pix-component/pix.component';
import { CreditComponent } from './credit-component/credit.component';
import { BankSlipComponent } from './bankslip-component/bankslip.component';
import { TaxAuthService } from '../../../admin/service/tax.auth.service';
import { TaxInfo } from '../../../admin/data/tax.data';
import { DebitComponent } from './debit-component/debit.component';


@Component({
  selector: 'app-finally-page',
   imports: [
    BarComponent,
    BtnContinueComponent,
    CartCardComponent,
    ClientCardComponent,
    MethodPaymentCardComponent,
    MethodShippingCardComponent,
    WhatsappComponent,
    PixComponent,
    CreditComponent,
    DebitComponent,
    BankSlipComponent,
    CommonModule
  ],
  templateUrl: './finally-page.component.html',
  styleUrl: './finally-page.component.css'
})
export class FinallyPageComponent implements OnInit {
  
  cartStatus: number = 0;
  paymentMethodLoad: PaymentMethodType | null = null;
  orderData: any;

  cartId: string | null = null;
  paymentData: any;
  paymentMethod: PaymentMethodType | null = null;
  deliveryBool!: boolean;

  cartData: any;
  cartItems: CartCardItemData[] = [];

  product_total: string = "0,00";
  installation_total: string = "0,00";
  delivery_total: string = "0,00";
  
  discount_total: string | null = null;
  discount: number = 0;

  opInstallations: InstallOption[] = [];
  selectedInstallations: InstallOption[] = [];
  deliveryPrice?: string;
  clientData?: ClientInfoResponse;
  amount: string = "0";

  totalPrice: string | undefined;

  selectedDelivery: string | undefined;
  selectedMethod: PaymentMethodType | undefined;

  error: string | null = null;
  isLoading = false;

  saleData?: SaleDataCart;

  total_value: number = 0;

  taxInfoList: TaxInfo[] = [];

  tax: number = 0;
  criteriaValue: number = 0;
  minValue: number = 0;
  maxValue: number = 0;  

  readonly cart = signal<Cart>({
    id: 'Selecionar Tudo',
    completed: false,
    items: []
  });
  readonly partiallyComplete = computed(() => {
    const cart = this.cart();
    return cart.items?.some(item => item.select) && !cart.items?.every(item => item.select);
  });

  constructor(
    private paymentService: PaymentService,
    private taxService: TaxAuthService) {}

  ngOnInit(): void {
    this.getNavigationData();
    if (this.cartId){
      this.loadSale(this.cartId),
      this.loadTax()
    }
  }

  private getNavigationData(): void {
    this.cartStatus = history.state.cartStatus;
    this.paymentMethodLoad = history.state.paymentMethod;
    this.cartId = history.state.cartId;
    this.paymentData = history.state.paymentData;
    this.paymentMethod = history.state.paymentMethod;
    this.deliveryBool = history.state.deliveryMethod;
    this.orderData = history.state.orderData;
    if (!this.cartId) {
      this.cartId = sessionStorage.getItem('cartId');
    }
  }

  loadSale(cartId: string): void {
    this.paymentService.getSale(cartId).subscribe({
      next: (response: SaleDataCart) => {
        this.saleData = response;
        console.log(response)
        this.deliveryPrice = this.saleData.delivery_total;
        this.product_total = this.saleData.product_total;
        this.paymentMethod = this.saleData.payment_method;
        let prices = this.sumValues(this.saleData.delivery_total, this.saleData.product_total)
        this.totalPrice = prices[0]
        this.onDiscount()
        this.total_value = prices[1]
      },
      error: (error) => {
        console.error('Erro ao carregar venda:', error);
      }
    });
  }

  onCheckboxChange(installation: InstallOption): void {
    this.selectedInstallations = installation 
      ? [...this.selectedInstallations, installation] 
      : this.selectedInstallations.filter(v => v !== installation);
  }

  onPaymentMethodSelected(event: any) {    
    this.selectedMethod = event
  }

  loadTax(){
    this.taxService.getTaxList().subscribe((data: any) => {
      this.taxInfoList = data;
      console.log(this.taxInfoList)
      if (this.paymentMethod == PaymentMethodType.PIX) {
        this.discount = this.taxInfoList[0].rate_percentage;
        this.tax = this.taxInfoList[0].rate_percentage;
      }
      if (this.paymentMethod == PaymentMethodType.CREDIT_CARD){
        this.discount = this.taxInfoList[1].rate_percentage;
        this.tax = this.taxInfoList[1].rate_percentage;
        this.minValue = this.taxInfoList[1].range_start;
        this.maxValue = this.taxInfoList[1].range_end;
        this.criteriaValue = 0;
      }
      if (this.paymentMethod == PaymentMethodType.BOLETO){
        this.discount = this.taxInfoList[2].rate_percentage;
        this.tax = this.taxInfoList[2].rate_percentage;
      }
    })
    
  }

  onDiscount() {

    if (!this.product_total) return; 

    let valorNumerico: number = parseFloat(this.product_total.replace(',', '.'));
    let deliveryNumerico: number = parseFloat(this.deliveryPrice!.replace(',', '.'));

    if (isNaN(valorNumerico)) {
      console.error("Erro: O valor do produto não é um número válido.");
      return;
    }
    
    let valorDoDescontoAplicado: number = 0;
    
    if (this.paymentMethod === "PIX") {
      valorDoDescontoAplicado = (valorNumerico * this.discount) / 100;
      this.discount = valorDoDescontoAplicado; 
      
      this.discount_total = valorDoDescontoAplicado.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
    } else {
        valorDoDescontoAplicado = 0; 
        this.discount = 0; 
        this.discount_total = "R$ 0,00";
    }

    const precoFinal: number = (valorNumerico + (valorDoDescontoAplicado)) + deliveryNumerico;
    // const precoEmReais = precoFinal * 10;
    console.log(precoFinal, precoFinal, valorNumerico, valorNumerico, deliveryNumerico, valorDoDescontoAplicado, this.discount, this.delivery_total)
    this.totalPrice = precoFinal.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }


  private sumValues(...valores: string[]): [string, number] {
    const numeros = valores.map(valor => {
      const valorLimpo = valor.replace(/\./g, '').replace(',', '.');
      return parseFloat(valorLimpo) || 0;
    });
  
    const soma = numeros.reduce((total, num) => total + num, 0);

    return [soma.toFixed(2)
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'), soma]
  }

  private clearCart(): void {
    this.cartData = { id: 'Selecionar Tudo', completed: false, items: [] };
  }
}
