import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

import type { Order } from "@/features/orders/types";

type Props = {
  order: Order;
};

const BRAND = {
  emerald: "#064E3B",
  green: "#047857",
  gold: "#C9A227",
  paleGreen: "#ECFDF5",
  text: "#24352E",
  muted: "#64748B",
  border: "#DCE5E0",
  alternate: "#F7FAF8",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 58,
    paddingHorizontal: 34,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: BRAND.text,
    backgroundColor: BRAND.white,
  },
  header: {
    backgroundColor: BRAND.emerald,
    padding: 18,
    borderRadius: 7,
    borderBottomWidth: 4,
    borderBottomColor: BRAND.gold,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandBlock: {
    flexDirection: "row",
    alignItems: "center",
    width: "62%",
  },
  logo: {
    width: 48,
    height: 48,
    objectFit: "contain",
    marginRight: 12,
  },
  brand: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: BRAND.white,
    marginBottom: 4,
  },
  tagline: {
    fontSize: 9,
    color: "#D1FAE5",
    marginBottom: 4,
  },
  brandSubtitle: {
    fontSize: 8,
    color: "#D6E9DF",
  },
  documentBlock: {
    width: "35%",
    alignItems: "flex-end",
  },
  documentTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: BRAND.white,
    marginBottom: 6,
  },
  documentNumber: {
    fontSize: 9,
    color: "#D1FAE5",
    textAlign: "right",
    marginBottom: 3,
  },
  accentLine: {
    height: 3,
    backgroundColor: BRAND.gold,
    marginBottom: 22,
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  column: {
    width: "48%",
    padding: 12,
    borderWidth: 1,
    borderColor: BRAND.border,
    borderRadius: 5,
  },
  sectionLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: BRAND.green,
    marginBottom: 9,
  },
  value: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 3,
  },
  muted: {
    fontSize: 9,
    color: BRAND.muted,
    lineHeight: 1.6,
    marginBottom: 3,
  },
  status: {
    marginTop: 8,
    alignSelf: "flex-start",
    backgroundColor: BRAND.paleGreen,
    color: BRAND.green,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 3,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: BRAND.emerald,
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BRAND.emerald,
    paddingVertical: 12,
    paddingHorizontal: 7,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableHeaderText: {
    color: BRAND.white,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 7,
    borderBottomWidth: 1,
    borderBottomColor: BRAND.border,
  },
  alternateRow: {
    backgroundColor: BRAND.alternate,
  },
  cell: {
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  product: {
    width: "28%",
    paddingRight: 5,
  },
  sku: {
    width: "13%",
    paddingRight: 4,
  },
  quantity: {
    width: "9%",
    textAlign: "right",
  },
  price: {
    width: "18%",
    textAlign: "right",
  },
  discount: {
    width: "13%",
    textAlign: "right",
  },
  amount: {
    width: "19%",
    textAlign: "right",
  },
  totals: {
    marginTop: 18,
    alignItems: "flex-end",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 245,
    paddingVertical: 7,
  },
  totalLabel: {
    color: BRAND.muted,
    fontSize: 10,
  },
  totalValue: {
    fontSize: 10,
    textAlign: "right",
  },
  grandTotal: {
    backgroundColor: BRAND.paleGreen,
    borderLeftWidth: 4,
    borderLeftColor: BRAND.gold,
    marginTop: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  grandTotalLabel: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: BRAND.emerald,
  },
  grandTotalValue: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: BRAND.green,
    textAlign: "right",
  },
  details: {
    marginTop: 24,
    padding: 14,
    backgroundColor: BRAND.alternate,
    borderWidth: 1,
    borderColor: BRAND.border,
    borderRadius: 5,
  },
  detailsText: {
    fontSize: 9.5,
    color: "#475569",
    lineHeight: 1.8,
  },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 38,
  },
  signatureBlock: {
    width: "42%",
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: "#94A3B8",
    marginBottom: 7,
  },
  signatureLabel: {
    fontSize: 9,
    color: BRAND.muted,
  },
  footer: {
    marginTop: 25,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: BRAND.border,
  },
  thankYou: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: BRAND.emerald,
    marginBottom: 5,
  },
  footerText: {
    fontSize: 9,
    color: BRAND.muted,
    lineHeight: 1.7,
  },
  footerBrand: {
    marginTop: 7,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: BRAND.green,
  },
  pageNumber: {
    position: "absolute",
    bottom: 23,
    left: 34,
    right: 34,
    borderTopWidth: 1,
    borderTopColor: BRAND.border,
    paddingTop: 9,
    textAlign: "center",
    fontSize: 8.5,
    color: BRAND.muted,
  },
});

function formatMoney(value: number | null | undefined): string {
  const amount = Number(value ?? 0);

  return `INR ${new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0)}`;
}

function formatDate(value: string | null | undefined): string {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function readable(value: string | null | undefined): string {
  if (!value) return "Not specified";

  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function toNumber(value: number | null | undefined): number {
  const number = Number(value ?? 0);
  return Number.isFinite(number) ? number : 0;
}

function calculateOrderTotals(order: Order) {
  const items = order.items ?? [];

  const subtotal = items.reduce(
    (sum, item) => sum + toNumber(item.quantity) * toNumber(item.unitPrice),
    0,
  );

  const itemDiscount = items.reduce(
    (sum, item) => sum + Math.max(0, toNumber(item.discount)),
    0,
  );

  const itemsTotal = items.reduce((sum, item) => {
    const calculated = Math.max(
      0,
      toNumber(item.quantity) * toNumber(item.unitPrice) -
        Math.max(0, toNumber(item.discount)),
    );

    const saved = Number(item.lineTotal);

    const lineTotal =
      item.lineTotal != null && Number.isFinite(saved) && saved >= 0
        ? saved
        : calculated;

    return sum + lineTotal;
  }, 0);

  const orderDiscount = Math.max(0, toNumber(order.discount));

  return {
    subtotal,
    itemDiscount,
    orderDiscount,
    totalDiscount: itemDiscount + orderDiscount,
    grandTotal: Math.max(0, itemsTotal - orderDiscount),
  };
}

export default function OrderPdfDocument({ order }: Props) {
  const items = order.items ?? [];
  const totals = calculateOrderTotals(order);

  return (
    <Document
      title={`NEXORA Sales Order ${order.orderNumber}`}
      author="NEXORA | Sales & Business Management"
      subject={`Sales order for ${order.customerName}`}
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          <View style={styles.brandBlock}>
            <Image
              src="/images/Luxurious Gold and Emerald N Emblem.png"
              style={styles.logo}
            />
            <View>
              <Text style={styles.brand}>NEXORA</Text>
              <Text style={styles.tagline}>
                Smarter Sales. Stronger Business.
              </Text>
              <Text style={styles.brandSubtitle}>
                Sales & Business Management
              </Text>
            </View>
          </View>

          <View style={styles.documentBlock}>
            <Text style={styles.documentTitle}>SALES ORDER</Text>
            <Text style={styles.documentNumber}>{order.orderNumber}</Text>
            <Text style={styles.documentNumber}>
              {formatDate(order.createdAt)}
            </Text>
          </View>
        </View>

        <View style={styles.accentLine} />

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
              Date: {formatDate(order.createdAt)}
            </Text>
            <Text style={styles.muted}>
              Payment: {readable(order.paymentMethod)}
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

        {items.length > 0 ? (
          items.map((item, index) => {
            const calculated = Math.max(
              0,
              toNumber(item.quantity) * toNumber(item.unitPrice) -
                Math.max(0, toNumber(item.discount)),
            );

            const saved = Number(item.lineTotal);

            const lineTotal =
              item.lineTotal != null && Number.isFinite(saved) && saved >= 0
                ? saved
                : calculated;

            return (
              <View
                key={`${item.productId}-${index}`}
                style={[
                  styles.row,
                  ...(index % 2 ? [styles.alternateRow] : []),
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
                  {formatMoney(item.unitPrice)}
                </Text>
                <Text style={[styles.cell, styles.discount]}>
                  {formatMoney(item.discount)}
                </Text>
                <Text style={[styles.cell, styles.amount]}>
                  {formatMoney(lineTotal)}
                </Text>
              </View>
            );
          })
        ) : (
          <View style={styles.row}>
            <Text style={styles.cell}>No items found for this order.</Text>
          </View>
        )}

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

          {totals.orderDiscount > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Order discount</Text>
              <Text style={styles.totalValue}>
                - {formatMoney(totals.orderDiscount)}
              </Text>
            </View>
          )}

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total discount</Text>
            <Text style={styles.totalValue}>
              {formatMoney(totals.totalDiscount)}
            </Text>
          </View>

          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={styles.grandTotalLabel}>GRAND TOTAL</Text>
            <Text style={styles.grandTotalValue}>
              {formatMoney(totals.grandTotal)}
            </Text>
          </View>
        </View>

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

        <View style={styles.footer}>
          <Text style={styles.thankYou}>Thank you for choosing NEXORA!</Text>
          <Text style={styles.footerText}>
            Smarter Sales. Stronger Business.
          </Text>
          <Text style={styles.footerText}>
            Please retain this document for your business records.
          </Text>
          <Text style={styles.footerBrand}>
            NEXORA | SALES & BUSINESS MANAGEMENT
          </Text>
        </View>

        <Text
          fixed
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `NEXORA | Order ${order.orderNumber} | Page ${pageNumber} of ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}
