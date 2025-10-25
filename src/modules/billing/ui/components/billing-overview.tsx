"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, ArrowUpCircle } from "lucide-react";
import type { CurrentPlan } from "../../types";

interface BillingOverviewProps {
  currentPlan: CurrentPlan;
}

export const BillingOverview = ({ currentPlan }: BillingOverviewProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: CurrentPlan["status"]) => {
    switch (status) {
      case "active":
        return "default";
      case "trialing":
        return "secondary";
      case "past_due":
        return "destructive";
      case "canceled":
        return "outline";
      default:
        return "default";
    }
  };

  const getStatusText = (status: CurrentPlan["status"]) => {
    switch (status) {
      case "active":
        return "Active";
      case "trialing":
        return "Trial";
      case "past_due":
        return "Past Due";
      case "canceled":
        return "Canceled";
      default:
        return status;
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Current Plan</CardTitle>
            <Badge variant={getStatusColor(currentPlan.status)}>
              {getStatusText(currentPlan.status)}
            </Badge>
          </div>
          <CardDescription>Your subscription details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">{currentPlan.name}</h3>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">
                {formatCurrency(currentPlan.price)}
              </span>
              <span className="text-muted-foreground">
                /{currentPlan.billingPeriod}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Agents</span>
              <span className="font-medium">
                {currentPlan.maxAgents === "unlimited"
                  ? "Unlimited"
                  : currentPlan.maxAgents}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Meetings</span>
              <span className="font-medium">
                {currentPlan.maxMeetings === "unlimited"
                  ? "Unlimited"
                  : currentPlan.maxMeetings}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Auto-renew</span>
              <span className="font-medium">
                {currentPlan.autoRenew ? "Enabled" : "Disabled"}
              </span>
            </div>
          </div>

          <div className="pt-4">
            <Button variant="outline" className="w-full">
              <ArrowUpCircle className="mr-2 size-4" />
              Upgrade Plan
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Next Payment</CardTitle>
          <CardDescription>Upcoming billing information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="size-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Payment Date</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(currentPlan.nextPaymentDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <CreditCard className="size-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">Amount Due</p>
                <p className="text-2xl font-bold">
                  {formatCurrency(currentPlan.nextPaymentAmount)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <p className="text-xs text-muted-foreground">Current Period</p>
            <p className="text-sm">
              {formatDate(currentPlan.currentPeriodStart)} -{" "}
              {formatDate(currentPlan.currentPeriodEnd)}
            </p>
          </div>

          <div className="pt-4">
            <Button variant="outline" className="w-full">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
