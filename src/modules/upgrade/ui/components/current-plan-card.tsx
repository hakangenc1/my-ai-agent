import { Calendar, Users, Video } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { PricingPlan } from "../../mock-data";

interface CurrentPlanCardProps {
  plan: PricingPlan;
  usageStats?: {
    agentsUsed: number;
    meetingsUsed: number;
  };
}

export function CurrentPlanCard({ plan, usageStats }: CurrentPlanCardProps) {
  const agentsUsed = usageStats?.agentsUsed ?? 0;
  const meetingsUsed = usageStats?.meetingsUsed ?? 0;

  const agentsLimit = plan.maxAgents;
  const meetingsLimit = plan.maxMeetings;

  const getUsagePercentage = (used: number, limit: number | "unlimited") => {
    if (limit === "unlimited") return 0;
    return Math.round((used / limit) * 100);
  };

  const agentsPercentage = getUsagePercentage(agentsUsed, agentsLimit);
  const meetingsPercentage = getUsagePercentage(meetingsUsed, meetingsLimit);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              Manage your subscription and billing
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-sm font-semibold">
            {plan.name}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Plan Price</div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">${plan.price}</span>
            <span className="text-sm text-muted-foreground">
              /{plan.billingPeriod}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">AI Agents</span>
              </div>
              <span className="text-muted-foreground">
                {agentsUsed} / {agentsLimit === "unlimited" ? "∞" : agentsLimit}
              </span>
            </div>
            {agentsLimit !== "unlimited" && (
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${agentsPercentage}%` }}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Meetings this month</span>
              </div>
              <span className="text-muted-foreground">
                {meetingsUsed} /{" "}
                {meetingsLimit === "unlimited" ? "∞" : meetingsLimit}
              </span>
            </div>
            {meetingsLimit !== "unlimited" && (
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${meetingsPercentage}%` }}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Next billing date: January 1, 2026</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
