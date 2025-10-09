import { Component, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from '../../../shared/bar/bar.component';
import { BtnContinueComponent } from '../../../shared/btn/btn-continue/btn-continue.component';
import { ClientCardComponent } from '../../../shared/client-card/client-card.component';
import { CartCardComponent } from '../../../shared/cart-card/cart-card.component';
import { MethodPaymentCardComponent } from '../method-payment-card/method-payment-card.component'; 
import { MethodShippingCardComponent } from '../method-shipping-card/method-shipping-card.component';
import { BtnConfirmComponent } from '../../../shared/btn/btn-confirm/btn-confirm.component';
import { Cart, CartCardItemData, InstallOption, PaymentMethodType } from '../../../data/card.data';
import { ClientInfoResponse } from '../../../data/client.data';
import { WhatsappComponent } from '../../../shared/whatsapp/whatsapp.component';
import { PaymentService } from '../../../service/payment.service';
import { PaymentPixResponse, SaleDataCart } from '../../../data/payment.data';
import { PixComponent } from './pix-component/pix.component';
import { CreditComponent } from './credit-component/credit.component';
import { DebitComponent } from './debit-component/debit.component';
import { BankSlipComponent } from './bankslip-component/bankslip.component';


@Component({
  selector: 'app-finally-page',
   imports: [
    BarComponent,
    BtnContinueComponent,
    CartCardComponent,
    ClientCardComponent,
    MethodPaymentCardComponent,
    MethodShippingCardComponent,
    CommonModule,
    WhatsappComponent,
    PixComponent,
    CreditComponent,
    DebitComponent,
    BankSlipComponent
  ],
  templateUrl: './finally-page.component.html',
  styleUrl: './finally-page.component.css'
})
export class FinallyPageComponent implements OnInit {
  
  cartId: string | null = null;
  paymentData: any;
  paymentMethod: PaymentMethodType | null = null;
  deliveryBool!: boolean;

  cartData: any;
  cartItems: CartCardItemData[] = [];

  product_total: string = "0,00";
  installation_total: string = "0,00";
  delivery_total: string = "0,00";

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
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.getNavigationData();
    if (this.cartId){
      this.loadSale(this.cartId)
    }
  }

  private getNavigationData(): void {
    this.cartId = history.state.cartId;
    this.paymentData = history.state.paymentData;
    this.paymentMethod = history.state.paymentMethod;
    this.deliveryBool = history.state.deliveryMethod;
    console.log(this.paymentData)
    console.log(this.paymentMethod)
    console.log(this.deliveryBool)
    console.log(this.saleData)
    if (!this.cartId) {
      this.cartId = sessionStorage.getItem('cartId');
    }
  }

  loadSale(cartId: string): void {
    this.paymentService.getSale(cartId).subscribe({
      next: (response: SaleDataCart) => {
        this.saleData = response;
        this.deliveryPrice = this.saleData.delivery_total;
        this.product_total = this.saleData.product_total;
        let prices = this.sumValues(this.saleData.delivery_total, this.saleData.product_total)
        this.totalPrice = prices[0]
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
