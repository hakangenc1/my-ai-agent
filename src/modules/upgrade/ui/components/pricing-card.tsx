import { Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PricingPlan } from "../../mock-data";

interface PricingCardProps {
  plan: PricingPlan;
  isCurrentPlan?: boolean;
  onUpgrade?: (planId: string) => void;
}

export function PricingCard({
  plan,
  isCurrentPlan = false,
  onUpgrade,
}: PricingCardProps) {
  const handleUpgrade = () => {
    if (onUpgrade && !isCurrentPlan) {
      onUpgrade(plan.id);
    }
  };

  return (
    <Card
      className={cn(
        "relative flex flex-col",
        plan.popular && "border-primary shadow-lg ring-2 ring-primary/20"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="px-3 py-1 text-xs font-semibold">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader>
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription className="mt-2">{plan.description}</CardDescription>

        <div className="mt-4">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight">
              ${plan.price}
            </span>
            <span className="text-sm text-muted-foreground">
              /{plan.billingPeriod}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium">
            <span className="text-foreground">
              {typeof plan.maxAgents === "number"
                ? `${plan.maxAgents} agents`
                : "Unlimited agents"}
            </span>
          </div>
          <div className="text-sm font-medium">
            <span className="text-foreground">
              {typeof plan.maxMeetings === "number"
                ? `${plan.maxMeetings} meetings/month`
                : "Unlimited meetings"}
            </span>
          </div>
        </div>

        <div className="space-y-3 pt-4">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                  feature.included
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {feature.included ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <X className="h-3 w-3" />
                )}
              </div>
              <span
                className={cn(
                  "text-sm",
                  feature.included
                    ? "text-foreground"
                    : "text-muted-foreground line-through"
                )}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <CardAction className="w-full">
          <Button
            className="w-full"
            size="lg"
            variant={plan.popular ? "default" : "outline"}
            disabled={isCurrentPlan}
            onClick={handleUpgrade}
          >
            {isCurrentPlan ? "Current Plan" : plan.buttonText}
          </Button>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
