"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import type { Invoice } from "../../types";

interface BillingHistoryTableProps {
  invoices: Invoice[];
}

export const BillingHistoryTable = ({
  invoices,
}: BillingHistoryTableProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
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

  const getStatusVariant = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      case "refunded":
        return "outline";
      default:
        return "default";
    }
  };

  const getStatusText = (status: Invoice["status"]) => {
    switch (status) {
      case "paid":
        return "Paid";
      case "pending":
        return "Pending";
      case "failed":
        return "Failed";
      case "refunded":
        return "Refunded";
      default:
        return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>
          View and download your past invoices
        </CardDescription>
      </CardHeader>
      <CardContent>
        {invoices.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FileText className="size-12 text-muted-foreground mb-4" />
            <p className="text-sm text-muted-foreground">
              No billing history available yet
            </p>
          </div>
        ) : (
          <div className="relative overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      {invoice.invoiceNumber}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <p className="text-sm">{invoice.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(invoice.periodStart)} -{" "}
                          {formatDate(invoice.periodEnd)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(invoice.date)}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(invoice.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(invoice.status)}>
                        {getStatusText(invoice.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={!invoice.downloadUrl}
                        >
                          <Download className="mr-2 size-4" />
                          Download
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
