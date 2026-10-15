import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

import type { Order } from "@/features/orders/types";

type Props = {
  order: Order;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 48,
    paddingHorizontal: 38,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#26332f",
    backgroundColor: "#ffffff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#064e3b",
    padding: 18,
    borderRadius: 5,
  },

  brand: {
    fontSize: 17,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 8,
    color: "#d1fae5",
  },

  documentTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    textAlign: "right",
    marginBottom: 5,
  },

  documentNumber: {
    fontSize: 8,
    color: "#d1fae5",
    textAlign: "right",
  },

  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 20,
  },

  column: {
    width: "48%",
  },

  sectionLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#047857",
    letterSpacing: 0.7,
    marginBottom: 8,
  },

  value: {
    fontSize: 9,
    lineHeight: 1.6,
  },

  muted: {
    fontSize: 8,
    color: "#64748b",
    lineHeight: 1.6,
  },

  status: {
    marginTop: 7,
    alignSelf: "flex-start",
    backgroundColor: "#d1fae5",
    color: "#047857",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 3,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },

  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#064e3b",
    marginBottom: 10,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#064e3b",
    paddingVertical: 9,
    paddingHorizontal: 6,
  },

  tableHeaderText: {
    color: "#ffffff",
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
  },

  row: {
    flexDirection: "row",
    paddingVertical: 9,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  alternateRow: {
    backgroundColor: "#f8faf9",
  },

  cell: {
    fontSize: 7.5,
    lineHeight: 1.4,
  },

  product: {
    width: "30%",
    paddingRight: 4,
  },

  sku: {
    width: "14%",
    paddingRight: 3,
  },

  quantity: {
    width: "9%",
    textAlign: "right",
  },

  price: {
    width: "16%",
    textAlign: "right",
  },

  discount: {
    width: "13%",
    textAlign: "right",
  },

  amount: {
    width: "18%",
    textAlign: "right",
  },

  totals: {
    marginTop: 15,
    alignItems: "flex-end",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 220,
    paddingVertical: 5,
  },

  totalLabel: {
    color: "#64748b",
    fontSize: 9,
  },

  totalValue: {
    fontSize: 9,
    textAlign: "right",
  },

  grandTotal: {
    borderTopWidth: 1,
    borderTopColor: "#064e3b",
    marginTop: 5,
    paddingTop: 10,
  },

  grandTotalLabel: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#064e3b",
  },

  grandTotalValue: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#047857",
    textAlign: "right",
  },

  details: {
    marginTop: 22,
    padding: 12,
    backgroundColor: "#f8faf9",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
  },

  detailsText: {
    fontSize: 8.5,
    color: "#475569",
    lineHeight: 1.7,
  },

  footer: {
    marginTop: 22,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  thankYou: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#064e3b",
    marginBottom: 5,
  },

  footerText: {
    fontSize: 8,
    color: "#64748b",
    lineHeight: 1.6,
  },

  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 36,
  },

  signatureBlock: {
    width: "42%",
  },

  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#94a3b8",
    marginBottom: 6,
  },

  signatureLabel: {
    fontSize: 8,
    color: "#64748b",
  },

  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 38,
    right: 38,
    textAlign: "center",
    fontSize: 8,
    color: "#94a3b8",
  },
});

// Format currency safely.
function formatMoney(value: number): string {
  const amount = Number(value);

  return `INR ${new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0)}`;
}

// Format dates safely.
function formatDate(value: string): string {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Convert status and payment values into readable text.
function readable(value: string | null | undefined): string {
  if (!value) return "Not specified";

  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

// Convert values to valid finite numbers.
function toNumber(value: number | null | undefined): number {
  const result = Number(value ?? 0);

  return Number.isFinite(result) ? result : 0;
}

/**
 * Calculate totals.
 *
 * Assumptions:
 * - item.discount is the discount amount for the entire line.
 * - order.discount is the total discount for the order.
 * - item.lineTotal is the final line amount after its item discount.
 *
 * The order-level discount is applied after the item totals.
 */
function calculateOrderTotals(order: Order) {
  const items = order.items ?? [];

  const subtotal = items.reduce((sum, item) => {
    return sum + toNumber(item.quantity) * toNumber(item.unitPrice);
  }, 0);

  const itemDiscount = items.reduce((sum, item) => {
    return sum + Math.max(0, toNumber(item.discount));
  }, 0);

  const itemsTotal = items.reduce((sum, item) => {
    const calculatedLineTotal =
      toNumber(item.quantity) * toNumber(item.unitPrice) -
      Math.max(0, toNumber(item.discount));

    // Prefer the saved line total when it is a valid non-negative amount.
    const savedLineTotal = toNumber(item.lineTotal);

    const lineTotal =
      Number.isFinite(Number(item.lineTotal)) && savedLineTotal >= 0
        ? savedLineTotal
        : Math.max(0, calculatedLineTotal);

    return sum + lineTotal;
  }, 0);

  const orderDiscount = Math.max(0, toNumber(order.discount));

  // Apply the order discount once to the sum of line totals.
  const grandTotal = Math.max(0, itemsTotal - orderDiscount);

  return {
    subtotal,
    itemDiscount,
    orderDiscount,
    totalDiscount: itemDiscount + orderDiscount,
    itemsTotal,
    grandTotal,
  };
}

export default function OrderPdfDocument({ order }: Props) {
  const items = order.items ?? [];
  const totals = calculateOrderTotals(order);

  return (
    <Document
      title={`Sales Order ${order.orderNumber}`}
      author="Sales Management"
      subject={`Order for ${order.customerName}`}
    >
      <Page size="A4" style={styles.page} wrap>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>SALES MANAGEMENT</Text>
            <Text style={styles.subtitle}>Professional Order Document</Text>
          </View>

          <View>
            <Text style={styles.documentTitle}>SALES ORDER</Text>
            <Text style={styles.documentNumber}>{order.orderNumber}</Text>
          </View>
        </View>

        {/* Customer and order details */}
        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.sectionLabel}>CUSTOMER DETAILS</Text>

            <Text style={styles.value}>
              {order.customerName || "Unknown customer"}
            </Text>

            <Text style={styles.muted}>
              Customer ID: {order.customerId || "—"}
            </Text>

            <Text style={styles.muted}>
              Delivery address: {order.deliveryAddress || "Not provided"}
            </Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.sectionLabel}>ORDER INFORMATION</Text>

            <Text style={styles.value}>Order No: {order.orderNumber}</Text>

            <Text style={styles.muted}>
              Order date: {formatDate(order.createdAt)}
            </Text>

            <Text style={styles.muted}>
              Payment: {readable(order.paymentMethod)}
            </Text>

            <Text style={styles.status}>{readable(order.status)}</Text>
          </View>
        </View>

        {/* Items table */}
        <Text style={styles.sectionTitle}>Order Items</Text>

        <View style={styles.tableHeader} fixed>
          <Text style={[styles.tableHeaderText, styles.product]}>Product</Text>

          <Text style={[styles.tableHeaderText, styles.sku]}>SKU</Text>

          <Text style={[styles.tableHeaderText, styles.quantity]}>Qty</Text>

          <Text style={[styles.tableHeaderText, styles.price]}>Unit Price</Text>

          <Text style={[styles.tableHeaderText, styles.discount]}>
            Discount
          </Text>

          <Text style={[styles.tableHeaderText, styles.amount]}>Amount</Text>
        </View>

        {items.length > 0 ? (
          items.map((item, index) => (
            <View
              key={`${item.productId}-${index}`}
              style={[
                styles.row,
                ...(index % 2 === 1 ? [styles.alternateRow] : []),
              ]}
              wrap={false}
            >
              <Text style={[styles.cell, styles.product]}>
                {item.productName || "Unnamed product"}
              </Text>

              <Text style={[styles.cell, styles.sku]}>{item.sku || "—"}</Text>

              <Text style={[styles.cell, styles.quantity]}>
                {toNumber(item.quantity)}
              </Text>

              <Text style={[styles.cell, styles.price]}>
                {formatMoney(toNumber(item.unitPrice))}
              </Text>

              <Text style={[styles.cell, styles.discount]}>
                {formatMoney(toNumber(item.discount))}
              </Text>

              <Text style={[styles.cell, styles.amount]}>
                {formatMoney(toNumber(item.lineTotal))}
              </Text>
            </View>
          ))
        ) : (
          <View style={styles.row}>
            <Text style={styles.cell}>No items found for this order.</Text>
          </View>
        )}

        {/* Corrected totals */}
        <View style={styles.totals} wrap={false}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>

            <Text style={styles.totalValue}>
              {formatMoney(totals.subtotal)}
            </Text>
          </View>

          {totals.itemDiscount > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Item discounts</Text>

              <Text style={styles.totalValue}>
                - {formatMoney(totals.itemDiscount)}
              </Text>
            </View>
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Order discount</Text>

            <Text style={styles.totalValue}>
              - {formatMoney(totals.orderDiscount)}
            </Text>
          </View>

          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={styles.grandTotalLabel}>GRAND TOTAL</Text>

            <Text style={styles.grandTotalValue}>
              {formatMoney(totals.grandTotal)}
            </Text>
          </View>
        </View>

        {/* Payment and notes */}
        <View style={styles.details} wrap={false}>
          <Text style={styles.sectionLabel}>PAYMENT & ORDER NOTES</Text>

          <Text style={styles.detailsText}>
            Payment method: {readable(order.paymentMethod)}
          </Text>

          <Text style={styles.detailsText}>
            Order status: {readable(order.status)}
          </Text>

          <Text style={styles.detailsText}>
            Notes: {order.notes || "No additional notes"}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.thankYou}>Thank you for your business!</Text>

          <Text style={styles.footerText}>
            We appreciate your trust and look forward to serving you again.
          </Text>

          <Text style={styles.footerText}>
            Please retain this document for your order records.
          </Text>
        </View>

        {/* Signatures */}
        <View style={styles.signatures} wrap={false}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Customer Signature</Text>
          </View>

          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Authorized Signature</Text>
          </View>
        </View>

        {/* Page number */}
        <Text
          fixed
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Order ${order.orderNumber} | Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}
