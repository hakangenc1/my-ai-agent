"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { toast } from "sonner";
import { CurrentPlanCard } from "../components/current-plan-card";
import { PricingCard } from "../components/pricing-card";
import {
  MOCK_CURRENT_PLAN,
  MOCK_PRICING_PLANS,
  getCurrentPlanData,
} from "../../mock-data";

export function UpgradeView() {
  // Mock current plan data
  const currentPlanData = getCurrentPlanData(MOCK_CURRENT_PLAN);

  // Mock usage statistics
  const [usageStats] = useState({
    agentsUsed: 1,
    meetingsUsed: 3,
  });

  const handleUpgrade = (planId: string) => {
    // This is a placeholder for the actual upgrade logic
    toast.info("Upgrade feature coming soon!", {
      description: `You selected the ${planId} plan. This feature will be implemented in the next phase.`,
    });
  };

  if (!currentPlanData) {
    return null;
  }

  return (
    <div className="space-y-8 container mx-auto mt-5">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            Upgrade Your Plan
          </h1>
        </div>
        <p className="text-muted-foreground">
          Choose the perfect plan for your needs. Upgrade or downgrade at any
          time.
        </p>
      </div>

      {/* Current Plan Section */}
      <div>
        <CurrentPlanCard plan={currentPlanData} usageStats={usageStats} />
      </div>

      {/* Pricing Plans Section */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Available Plans
          </h2>
          <p className="text-sm text-muted-foreground">
            Select a plan that best fits your requirements
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MOCK_PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={plan.tier === MOCK_CURRENT_PLAN}
              onUpgrade={handleUpgrade}
            />
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-4 border-t pt-8">
        <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-medium">Can I change plans anytime?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes
              will be reflected in your next billing cycle.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">What payment methods do you accept?</h3>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards, PayPal, and wire transfers for
              Enterprise plans.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">Is there a free trial?</h3>
            <p className="text-sm text-muted-foreground">
              The Free plan is available forever with no credit card required.
              You can upgrade at any time.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">What happens if I exceed my limits?</h3>
            <p className="text-sm text-muted-foreground">
              You will be notified when approaching your limits and can upgrade
              your plan to continue using the service without interruption.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
