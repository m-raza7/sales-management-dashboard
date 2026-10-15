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

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value || "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function readable(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function OrderPdfDocument({ order }: Props) {
  const items = order.items ?? [];

  return (
    <Document
      title={`Sales Order ${order.orderNumber}`}
      author="Sales Management"
      subject={`Order for ${order.customerName}`}
    >
      <Page size="A4" style={styles.page} wrap>
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

        <View style={styles.columns}>
          <View style={styles.column}>
            <Text style={styles.sectionLabel}>CUSTOMER DETAILS</Text>
            <Text style={styles.value}>{order.customerName}</Text>
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
              Payment: {readable(order.paymentMethod || "Not specified")}
            </Text>
            <Text style={styles.status}>{readable(order.status)}</Text>
          </View>
        </View>

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

        {items.map((item, index) => (
          <View
            key={`${item.productId}-${index}`}
            style={[
              styles.row,
              ...(index % 2 === 1 ? [styles.alternateRow] : []),
            ]}
            wrap={false}
          >
            <Text style={[styles.cell, styles.product]}>
              {item.productName}
            </Text>
            <Text style={[styles.cell, styles.sku]}>{item.sku || "—"}</Text>
            <Text style={[styles.cell, styles.quantity]}>{item.quantity}</Text>
            <Text style={[styles.cell, styles.price]}>
              {formatMoney(item.unitPrice)}
            </Text>
            <Text style={[styles.cell, styles.discount]}>
              {formatMoney(item.discount)}
            </Text>
            <Text style={[styles.cell, styles.amount]}>
              {formatMoney(item.lineTotal)}
            </Text>
          </View>
        ))}

        <View style={styles.totals} wrap={false}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{formatMoney(order.subtotal)}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total discount</Text>
            <Text style={styles.totalValue}>{formatMoney(order.discount)}</Text>
          </View>

          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={styles.grandTotalLabel}>GRAND TOTAL</Text>
            <Text style={styles.grandTotalValue}>
              {formatMoney(order.total)}
            </Text>
          </View>
        </View>

        <View style={styles.details} wrap={false}>
          <Text style={styles.sectionLabel}>PAYMENT & ORDER NOTES</Text>
          <Text style={styles.detailsText}>
            Payment method: {readable(order.paymentMethod || "Not specified")}
          </Text>
          <Text style={styles.detailsText}>
            Order status: {readable(order.status)}
          </Text>
          <Text style={styles.detailsText}>
            Notes: {order.notes || "No additional notes"}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.thankYou}>Thank you for your business!</Text>
          <Text style={styles.footerText}>
            We appreciate your trust and look forward to serving you again.
          </Text>
          <Text style={styles.footerText}>
            Please retain this document for your order records.
          </Text>
        </View>

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
