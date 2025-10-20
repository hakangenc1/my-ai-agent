import { Metadata } from "next";
import { UpgradeView } from "@/modules/upgrade/ui/views/upgrade-view";

export const metadata: Metadata = {
  title: "Upgrade Plan",
  description: "Upgrade your subscription plan to unlock more features",
};

export default function UpgradePage() {
  return <UpgradeView />;
}
