import { AbstractControl } from "@angular/forms";

export interface TaxInfo {
  payment_method: string;
  created_at: string;
  rate_percentage: number;
  range_criteria: number;
  range_start: number;
  range_end: number;
}

export interface TaxForm {
  type: AbstractControl<string | null>; // Tipo de pagamento (PIX, CREDIT_CARD, BOLETO)
  tax: AbstractControl<number | null>; // Taxa (%)
  min: AbstractControl<number | null>; // Parcela mínima (apenas CREDIT_CARD)
  max: AbstractControl<number | null>; // Parcela máxima (apenas CREDIT_CARD)
}