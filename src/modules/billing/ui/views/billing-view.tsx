"use client";

import { BillingOverview } from "../components/billing-overview";
import { PaymentMethodCard } from "../components/payment-method-card";
import { BillingHistoryTable } from "../components/billing-history-table";
import {
  mockCurrentPlan,
  mockPaymentMethods,
  mockInvoices,
  mockBillingAddress,
} from "../../mock-data";

export const BillingView = () => {
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <BillingOverview currentPlan={mockCurrentPlan} />
      <PaymentMethodCard
        paymentMethods={mockPaymentMethods}
        billingAddress={mockBillingAddress}
      />
      <BillingHistoryTable invoices={mockInvoices} />
    </div>
  );
};

export const BillingViewLoading = () => {
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        <p className="text-sm text-muted-foreground">Loading billing information...</p>
      </div>
    </div>
  );
};

export const BillingViewError = () => {
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center max-w-md">
        <div className="rounded-full bg-destructive/10 p-4">
          <svg
            className="h-8 w-8 text-destructive"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Failed to load billing information</h3>
        <p className="text-sm text-muted-foreground">
          There was an error loading your billing details. Please try again later.
        </p>
      </div>
    </div>
  );
};
