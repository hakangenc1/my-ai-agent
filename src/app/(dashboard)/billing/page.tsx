import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import {
  BillingView,
  BillingViewLoading,
  BillingViewError,
} from "@/modules/billing/ui/views/billing-view";
import { ErrorBoundary } from "react-error-boundary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
  description: "Manage your billing and subscription",
};

const BillingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your subscription, payment methods, and billing history
          </p>
        </div>
      </div>
      <Suspense fallback={<BillingViewLoading />}>
        <ErrorBoundary fallback={<BillingViewError />}>
          <BillingView />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default BillingPage;
