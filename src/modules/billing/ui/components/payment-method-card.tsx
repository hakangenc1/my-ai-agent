"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, MoreVertical } from "lucide-react";
import type { PaymentMethod, BillingAddress } from "../../types";

interface PaymentMethodCardProps {
  paymentMethods: PaymentMethod[];
  billingAddress: BillingAddress;
}

export const PaymentMethodCard = ({
  paymentMethods,
  billingAddress,
}: PaymentMethodCardProps) => {
  const formatCardBrand = (brand: string) => {
    return brand.charAt(0).toUpperCase() + brand.slice(1);
  };

  const formatExpiryDate = (month?: number, year?: number) => {
    if (!month || !year) return "";
    return `${month.toString().padStart(2, "0")}/${year.toString().slice(-2)}`;
  };

  const getPaymentMethodIcon = (type: PaymentMethod["type"]) => {
    return <CreditCard className="size-5" />;
  };

  const getPaymentMethodLabel = (method: PaymentMethod) => {
    switch (method.type) {
      case "card":
        return `${formatCardBrand(method.brand || "")} ending in ${method.last4}`;
      case "paypal":
        return `PayPal - ${method.email}`;
      case "bank_account":
        return `Bank account ending in ${method.last4}`;
      default:
        return "Payment method";
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Payment Methods</CardTitle>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 size-4" />
              Add New
            </Button>
          </div>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {paymentMethods.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CreditCard className="size-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                No payment methods added yet
              </p>
            </div>
          ) : (
            paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    {getPaymentMethodIcon(method.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      {getPaymentMethodLabel(method)}
                    </p>
                    {method.type === "card" && (
                      <p className="text-xs text-muted-foreground">
                        Expires {formatExpiryDate(method.expiryMonth, method.expiryYear)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault && (
                    <Badge variant="secondary" className="text-xs">
                      Default
                    </Badge>
                  )}
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreVertical className="size-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Billing Address</CardTitle>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </div>
          <CardDescription>Your billing information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm">{billingAddress.line1}</p>
            {billingAddress.line2 && (
              <p className="text-sm">{billingAddress.line2}</p>
            )}
            <p className="text-sm">
              {billingAddress.city}, {billingAddress.state}{" "}
              {billingAddress.postalCode}
            </p>
            <p className="text-sm">{billingAddress.country}</p>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-muted/50 border">
            <p className="text-xs font-medium mb-1">Tax Information</p>
            <p className="text-xs text-muted-foreground">
              No tax ID on file. Add a tax ID to your billing address if applicable.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
