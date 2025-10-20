export type PlanTier = "free" | "starter" | "professional" | "enterprise";

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tier: PlanTier;
  price: number;
  billingPeriod: "month" | "year";
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText: string;
  maxAgents: number | "unlimited";
  maxMeetings: number | "unlimited";
}

export const MOCK_CURRENT_PLAN: PlanTier = "free";

export const MOCK_PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    tier: "free",
    price: 0,
    billingPeriod: "month",
    description: "Perfect for trying out AI agents",
    maxAgents: 2,
    maxMeetings: 5,
    features: [
      { text: "Up to 2 AI agents", included: true },
      { text: "5 meetings per month", included: true },
      { text: "Basic agent templates", included: true },
      { text: "Community support", included: true },
      { text: "Standard video quality", included: true },
      { text: "Advanced analytics", included: false },
      { text: "Custom branding", included: false },
      { text: "Priority support", included: false },
    ],
    buttonText: "Current Plan",
  },
  {
    id: "starter",
    name: "Starter",
    tier: "starter",
    price: 29,
    billingPeriod: "month",
    description: "Great for small teams and growing projects",
    maxAgents: 10,
    maxMeetings: 50,
    popular: true,
    features: [
      { text: "Up to 10 AI agents", included: true },
      { text: "50 meetings per month", included: true },
      { text: "All agent templates", included: true },
      { text: "Email support", included: true },
      { text: "HD video quality", included: true },
      { text: "Basic analytics", included: true },
      { text: "Custom branding", included: false },
      { text: "Priority support", included: false },
    ],
    buttonText: "Upgrade to Starter",
  },
  {
    id: "professional",
    name: "Professional",
    tier: "professional",
    price: 99,
    billingPeriod: "month",
    description: "For professionals who need advanced features",
    maxAgents: 50,
    maxMeetings: 200,
    features: [
      { text: "Up to 50 AI agents", included: true },
      { text: "200 meetings per month", included: true },
      { text: "All agent templates", included: true },
      { text: "Priority email support", included: true },
      { text: "4K video quality", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Custom branding", included: true },
      { text: "API access", included: true },
    ],
    buttonText: "Upgrade to Professional",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tier: "enterprise",
    price: 299,
    billingPeriod: "month",
    description: "For large organizations with custom needs",
    maxAgents: "unlimited",
    maxMeetings: "unlimited",
    features: [
      { text: "Unlimited AI agents", included: true },
      { text: "Unlimited meetings", included: true },
      { text: "Custom agent templates", included: true },
      { text: "24/7 phone & email support", included: true },
      { text: "4K video quality", included: true },
      { text: "Advanced analytics & reporting", included: true },
      { text: "Custom branding", included: true },
      { text: "Full API access", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "SLA guarantee", included: true },
    ],
    buttonText: "Contact Sales",
  },
];

export const getCurrentPlanData = (tier: PlanTier): PricingPlan | undefined => {
  return MOCK_PRICING_PLANS.find((plan) => plan.tier === tier);
};
