export type BillingStatus = "active" | "past_due" | "canceled" | "trialing";
export type InvoiceStatus = "paid" | "pending" | "failed" | "refunded";
export type PaymentMethodType = "card" | "paypal" | "bank_account";

export interface CurrentPlan {
  id: string;
  name: string;
  tier: "free" | "starter" | "professional" | "enterprise";
  price: number;
  billingPeriod: "month" | "year";
  status: BillingStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  nextPaymentDate: Date;
  nextPaymentAmount: number;
  maxAgents: number | "unlimited";
  maxMeetings: number | "unlimited";
  autoRenew: boolean;
}

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  email?: string;
  isDefault: boolean;
  createdAt: Date;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  amount: number;
  status: InvoiceStatus;
  description: string;
  downloadUrl?: string;
  periodStart: Date;
  periodEnd: Date;
}

export interface BillingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}
