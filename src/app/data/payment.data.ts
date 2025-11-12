import { PaymentMethodType } from "./card.data";

export enum SaleDataOrderStatus {
  PENDING = 'Pendente',
  PROCESSING = 'Processando',
  COMPLETED = 'Concluído',
  CANCELLED = 'Cancelado'
}

export enum SaleDataInstallationType {
  NONE = '',
  STANDARD = 'standard',
  PREMIUM = 'premium'
}

export interface SaleDataCart {
  sale_id: string;
  payment_method: PaymentMethodType;
  product_total: string;
  delivery_total: string;
  install_list: string[];
}

export interface SaleDataResponse {
  carts: SaleDataCart[];
}

export interface QrCodeLinks {
  base64: string;
  png: string;
  text: string;
}

export interface QrCodeDisplay {
  expires_in_minutes: number;
  formatted_amount: string;
  formatted_expiration: string;
}

export interface QrCode {
  amount: number;
  display: QrCodeDisplay;
  expiration_date: string;
  id: string;
  links: QrCodeLinks;
}

export interface PaymentPixResponse {
  created_at: string;
  order_id: string;
  qr_code: QrCode;
  reference_id: string;
  status: string;
  timestamps: string;
  total_amount: number;
}

export interface PaymentCard {
  number: string;
  expMonth: string;
  expYear: string;
  holder: {
    name: string;
  }
  cvv: string;
}

export interface PaymentCredit {
  installments: number;
  card: PaymentCard;
  encrypted: string;
}

export interface PaymentDebit {
  card: PaymentCard;
  encrypted: string;
}

export interface InstallmentsTable {
  number: number;
  value: number;  
}


export interface ThreeDSSession {
  expires_at: number;
  session: string;
  public_key: string;
}

export interface threeDSRequest {
}


/// BOLETO
export interface BankSlipLinks{
  png: string;
  pdf: string;
  text_formatted: string;
  text: string;
}

export interface BankSlipDisplay {
  formatted_amount: string;
  formatted_expiration: string;
  expires_in_date: string;
  imgUrl: string;
}

export interface BankSlipBarCode {
  id: string;
  amount: number;
  expiration_date: string;
  links: BankSlipLinks;
  display: BankSlipDisplay;
}

export interface PaymentBankSlip{
  barcode: BankSlipBarCode; 
  created_at: string;
  order_id: string;
  reference_id: string;
  status: string;
  timestamps: string;
  total_amount: number;
}

// PaymentResponse

export interface PaymentResponse {
  cart_id: string; // CartId
  status: string; // Status Pago
  timestamp: string; // Data da Finalizacao
  installments: InstallmentsTable | undefined; // Parcela Caso Credito
  installations: []; // Instalacoes
  shipping: string; // Data de Entrega
  address: string; // Endereço 
  value: string;
}
