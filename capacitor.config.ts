import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.yourcompany.salesmanager",
  appName: "Sales Manager",
  server: {
    url: "https://sales-management-dashboard-ruby.vercel.app/dashboard",
    cleartext: false,
  },
};

export default config;
