export type Language = "en" | "mr" | "hi";

export const translations = {
  en: {
    // App and navigation
    appBrand: "Emerald Sales",

    workspace: "SALES WORKSPACE",

    dashboard: "Dashboard",

    customers: "Customers",

    products: "Products",

    orders: "Orders",

    newOrder: "New order",

    addCustomer: "Add customer",

    addProduct: "Add product",

    search: "Search...",

    settings: "Preferences",

    appearance: "Appearance",

    language: "Language",

    lightMode: "Light",

    darkMode: "Dark",

    systemMode: "System",
    // Dashboard
    welcome: "Welcome back",

    overview: "Here is your business overview.",

    totalCustomers: "Total customers",

    activeProducts: "Active products",

    totalOrders: "Total orders",

    pendingOrders: "Pending orders",

    orderValue: "Order value",

    recentOrders: "Recent orders",

    viewAll: "View all",

    quickActions: "Quick actions",

    shopDirectory: "Shop directory",

    productCatalogue: "Product catalogue",

    orderHistory: "Order history",
    // Common actions
    save: "Save",

    cancel: "Cancel",

    edit: "Edit",

    delete: "Delete",

    noData: "No records found",

    english: "English",

    marathi: "मराठी",

    hindi: "हिन्दी",

    loading: "Loading...",

    back: "Back",

    close: "Close",

    clear: "Clear",

    submit: "Submit",

    update: "Update",

    actions: "Actions",

    status: "Status",

    active: "Active",

    inactive: "Inactive",

    all: "All",

    allStatuses: "All statuses",

    optional: "Optional",

    required: "Required",

    description: "Description",

    notes: "Notes",

    name: "Name",

    email: "Email",

    phone: "Phone",

    address: "Address",

    city: "City",

    state: "State",

    pincode: "PIN code",
    // Products page
    salesManagement: "Sales management",

    productsDescription: "Manage products, packaging and selling prices.",

    totalProducts: "Total products",

    inactiveProducts: "Inactive products",

    catalogueDescription: "Manage product information and selling prices.",

    searchProducts: "Search products",

    searchProductPlaceholder: "Search product, SKU, brand or category...",

    clearSearch: "Clear search",

    loadingProducts: "Loading products...",

    noProductsFound: "No products found",

    noProductsYet: "No products yet",

    tryAnotherProduct: "Try another product name, SKU, brand or category.",

    addFirstProductDescription:
      "Add your first product to start building your catalogue.",

    addFirstProduct: "Add your first product",

    product: "Product",

    sku: "SKU / Product code",

    category: "Category",

    sizeUnit: "Size / Unit",

    price: "Price",

    noBrand: "No brand specified",

    showing: "Showing",

    of: "of",

    productsCount: "products",

    localStorageNotice: "Product information is saved in this browser.",

    deleteProductConfirm: 'Are you sure you want to delete "{name}"?',
    // Product form
    productDetails: "Product details",

    editProduct: "Edit product",

    productCatalogueLabel: "Product catalogue",

    productFormDescription:
      "Add a new product with its pricing, packaging, and availability.",

    editProductDescription:
      "Update your product information and catalogue settings.",

    basicInformation: "Basic information",

    productName: "Product name",

    productNameRequired: "Product name is required.",

    productNamePlaceholder: "Interior Wall Paint",

    skuPlaceholder: "PAINT-001",

    categoryPlaceholder: "Paint, beverages, hardware...",

    brand: "Brand",

    brandPlaceholder: "Brand name",

    pricingPackaging: "Pricing and packaging",

    sizePackaging: "Size / packaging",

    sizePlaceholder: "1 litre, 20 litre, 250 ml...",

    unit: "Unit",

    piece: "Piece",

    box: "Box",

    bottle: "Bottle",

    can: "Can",

    litre: "Litre",

    kilogram: "Kilogram",

    packet: "Packet",

    dozen: "Dozen",

    sellingPrice: "Selling price",

    validPrice: "Please enter a valid, non-negative selling price.",

    pricePerUnit: "Enter the selling price per selected unit.",

    availableForOrders: "Available for orders",

    availableDescription: "Customers can order this product.",

    unavailableDescription: "This product will be unavailable for new orders.",

    additionalDetails: "Additional details",

    optionalField: "Optional",

    productDescriptionPlaceholder:
      "Describe the product, its features, or other useful details...",

    characters: "characters",

    saveChanges: "Save changes",

    saveProduct: "Save product",

    saving: "Saving...",

    productSaveError: "Unable to save the product. Please try again.",

    productSaved: "Product saved successfully.",

    cancelEditing: "Cancel editing",

    enterProductInformation: "Enter the product information and selling price.",
    // Product statuses and actions
    confirmDelete: "Are you sure you want to delete",

    productDeleted: "Product deleted successfully.",

    productNotFound: "Product not found",

    productNotFoundDescription:
      "This product may have been deleted or the link may be incorrect.",

    viewProducts: "View products",

    editProductAction: "Edit product",

    deleteProductAction: "Delete product",
    // Customers
    totalCustomersLabel: "Total customers",

    customerDetails: "Customer details",

    customerName: "Customer name",

    shopName: "Shop name",

    ownerName: "Owner name",

    gstin: "GSTIN",

    addFirstCustomer: "Add your first customer",

    noCustomersYet: "No customers yet",

    noCustomersFound: "No customers found",

    searchCustomers: "Search customers",

    searchCustomerPlaceholder: "Search customer, shop or phone...",

    customerAdded: "Customer added successfully.",

    customerUpdated: "Customer updated successfully.",

    customerDeleted: "Customer deleted successfully.",

    // Customer directory page
    customersDescription:
      "Manage your shops, shopkeepers and customer information.",
    allRegisteredShops: "All registered shops",
    searchResults: "Search results",
    shopsMatchingSearch: "Shops matching your search",
    customerDirectoryDescription: "View and manage your registered customers.",
    loadingCustomers: "Loading customers...",
    tryAnotherCustomer:
      "Try another shop name, owner name, phone number or city.",
    addFirstCustomerDescription:
      "Add your first shop to start building your customer directory.",
    location: "Location",
    noEmailProvided: "No email provided",
    notSpecified: "Not specified",
    editCustomerAction: "Edit customer",
    deleteCustomerAction: "Delete customer",
    customerStorageNotice: "Customer information is saved in this browser.",
    deleteCustomerConfirm: 'Are you sure you want to delete "{name}"?',
    deleteOrderConfirm: 'Are you sure you want to delete order "{name}"?',
    // Orders
    totalOrdersLabel: "Total orders",

    newOrderTitle: "Create new order",

    orderDetails: "Order details",

    orderNumber: "Order number",

    customer: "Customer",

    selectCustomer: "Select customer",

    selectProduct: "Select product",

    quantity: "Quantity",

    unitPrice: "Unit price",

    discount: "Discount",

    subtotal: "Subtotal",

    total: "Total",

    paymentMethod: "Payment method",

    deliveryAddress: "Delivery address",

    pending: "Pending",

    confirmed: "Confirmed",

    dispatched: "Dispatched",

    delivered: "Delivered",

    cancelled: "Cancelled",

    noOrdersYet: "No orders yet",

    noOrdersFound: "No orders found",

    searchOrders: "Search orders",

    orderCreated: "Order created successfully.",

    orderUpdated: "Order updated successfully.",

    orderDeleted: "Order deleted successfully.",

    updateStatus: "Update status",

    cash: "Cash",

    bankTransfer: "Bank transfer",

    upi: "UPI",

    other: "Other",

    orderItems: "Order items",

    addItem: "Add item",

    removeItem: "Remove item",
    // Orders page
    ordersDescription:
      "Manage shop orders, track progress and review order totals.",

    totalOrderValue: "Total order value",

    allRecordedOrders: "All recorded orders",

    awaitingConfirmation: "Awaiting confirmation",

    excludesCancelledOrders: "Excludes cancelled orders",

    searchAndUpdateOrders: "Search orders and update their status.",

    searchOrderPlaceholder: "Search order, shop or product...",

    filterOrdersByStatus: "Filter orders by status",

    loadingOrders: "Loading orders...",

    noMatchingOrders: "No matching orders",

    changeOrderFilters: "Try changing your search or status filter.",

    createFirstOrderDescription:
      "Create your first order to start tracking sales.",

    clearFilters: "Clear filters",

    createFirstOrder: "Create first order",

    shop: "Shop",

    items: "Items",

    date: "Date",

    productLine: "product line",

    productLines: "product lines",

    deleteOrderAction: "Delete order",

    createAnotherOrder: "Create another order",
    // Errors and validation
    somethingWentWrong: "Something went wrong.",

    fillRequiredFields: "Please fill in all required fields.",

    invalidEmail: "Please enter a valid email address.",

    invalidPhone: "Please enter a valid phone number.",

    tryAgain: "Please try again.",

    noResults: "No results found",
  },

  mr: {
    // App and navigation
    appBrand: "एमराल्ड सेल्स",

    workspace: "विक्री व्यवस्थापन",

    dashboard: "डॅशबोर्ड",

    customers: "ग्राहक",

    products: "उत्पादने",

    orders: "ऑर्डर्स",

    newOrder: "नवीन ऑर्डर",

    addCustomer: "ग्राहक जोडा",

    addProduct: "उत्पादन जोडा",

    search: "शोधा...",

    settings: "प्राधान्ये",

    appearance: "दिसण्याची पद्धत",

    language: "भाषा",

    lightMode: "लाइट",

    darkMode: "डार्क",

    systemMode: "सिस्टम",
    // Dashboard
    welcome: "पुन्हा स्वागत आहे",

    overview: "तुमच्या व्यवसायाचा आढावा येथे आहे.",

    totalCustomers: "एकूण ग्राहक",

    activeProducts: "सक्रिय उत्पादने",

    totalOrders: "एकूण ऑर्डर्स",

    pendingOrders: "प्रलंबित ऑर्डर्स",

    orderValue: "ऑर्डरचे मूल्य",

    recentOrders: "अलीकडील ऑर्डर्स",

    viewAll: "सर्व पहा",

    quickActions: "जलद कृती",

    shopDirectory: "दुकानांची यादी",

    productCatalogue: "उत्पादन सूची",

    orderHistory: "ऑर्डर इतिहास",
    // Common actions
    save: "जतन करा",

    cancel: "रद्द करा",

    edit: "संपादित करा",

    delete: "हटवा",

    noData: "कोणतीही नोंद सापडली नाही",

    english: "English",

    marathi: "मराठी",

    hindi: "हिन्दी",

    loading: "लोड होत आहे...",

    back: "मागे",

    close: "बंद करा",

    clear: "पुसून टाका",

    submit: "सबमिट करा",

    update: "अपडेट करा",

    actions: "कृती",

    status: "स्थिती",

    active: "सक्रिय",

    inactive: "निष्क्रिय",

    all: "सर्व",

    allStatuses: "सर्व स्थिती",

    optional: "पर्यायी",

    required: "आवश्यक",

    description: "वर्णन",

    notes: "टिपा",

    name: "नाव",

    email: "ईमेल",

    phone: "फोन",

    address: "पत्ता",

    city: "शहर",

    state: "राज्य",

    pincode: "पिन कोड",
    // Products page
    salesManagement: "विक्री व्यवस्थापन",

    productsDescription:
      "उत्पादने, पॅकेजिंग आणि विक्री किंमती व्यवस्थापित करा.",

    totalProducts: "एकूण उत्पादने",

    inactiveProducts: "निष्क्रिय उत्पादने",

    catalogueDescription:
      "उत्पादनांची माहिती आणि विक्री किंमती व्यवस्थापित करा.",

    searchProducts: "उत्पादने शोधा",

    searchProductPlaceholder: "उत्पादन, SKU, ब्रँड किंवा श्रेणी शोधा...",

    clearSearch: "शोध काढा",

    loadingProducts: "उत्पादने लोड होत आहेत...",

    noProductsFound: "उत्पादने सापडली नाहीत",

    noProductsYet: "अद्याप कोणतीही उत्पादने नाहीत",

    tryAnotherProduct:
      "दुसरे उत्पादन नाव, SKU, ब्रँड किंवा श्रेणी वापरून पाहा.",

    addFirstProductDescription:
      "तुमची उत्पादन सूची तयार करण्यासाठी पहिले उत्पादन जोडा.",

    addFirstProduct: "पहिले उत्पादन जोडा",

    product: "उत्पादन",

    sku: "SKU / उत्पादन कोड",

    category: "श्रेणी",

    sizeUnit: "आकार / एकक",

    price: "किंमत",

    noBrand: "ब्रँड दिलेला नाही",

    showing: "दाखवत आहे",

    of: "पैकी",

    productsCount: "उत्पादने",

    localStorageNotice: "उत्पादनांची माहिती या ब्राउझरमध्ये जतन केली जाते.",

    deleteProductConfirm: '"{name}" हे उत्पादन हटवायचे आहे का?',
    // Product form
    productDetails: "उत्पादनाची माहिती",

    editProduct: "उत्पादन संपादित करा",

    productCatalogueLabel: "उत्पादन सूची",

    productFormDescription: "किंमत, पॅकेजिंग आणि उपलब्धतेसह नवीन उत्पादन जोडा.",

    editProductDescription: "उत्पादनाची माहिती आणि सूची अद्ययावत करा.",

    basicInformation: "मूलभूत माहिती",

    productName: "उत्पादनाचे नाव",

    productNameRequired: "उत्पादनाचे नाव आवश्यक आहे.",

    productNamePlaceholder: "इंटिरियर वॉल पेंट",

    skuPlaceholder: "PAINT-001",

    categoryPlaceholder: "पेंट, पेये, हार्डवेअर...",

    brand: "ब्रँड",

    brandPlaceholder: "ब्रँडचे नाव",

    pricingPackaging: "किंमत आणि पॅकेजिंग",

    sizePackaging: "आकार / पॅकेजिंग",

    sizePlaceholder: "१ लिटर, २० लिटर, २५० मिली...",

    unit: "एकक",

    piece: "नग",

    box: "बॉक्स",

    bottle: "बाटली",

    can: "कॅन",

    litre: "लिटर",

    kilogram: "किलोग्रॅम",

    packet: "पॅकेट",

    dozen: "डझन",

    sellingPrice: "विक्री किंमत",

    validPrice: "कृपया शून्य किंवा त्यापेक्षा जास्त योग्य किंमत भरा.",

    pricePerUnit: "निवडलेल्या प्रत्येक एककाची विक्री किंमत भरा.",

    availableForOrders: "ऑर्डरसाठी उपलब्ध",

    availableDescription: "ग्राहक हे उत्पादन ऑर्डर करू शकतात.",

    unavailableDescription: "हे उत्पादन नवीन ऑर्डरसाठी उपलब्ध नसेल.",

    additionalDetails: "अतिरिक्त माहिती",

    optionalField: "पर्यायी",

    productDescriptionPlaceholder:
      "उत्पादनाची वैशिष्ट्ये किंवा इतर माहिती लिहा...",

    characters: "अक्षरे",

    saveChanges: "बदल जतन करा",

    saveProduct: "उत्पादन जतन करा",

    saving: "जतन होत आहे...",

    productSaveError: "उत्पादन जतन करता आले नाही. कृपया पुन्हा प्रयत्न करा.",

    productSaved: "उत्पादन यशस्वीपणे जतन केले.",

    cancelEditing: "संपादन रद्द करा",

    enterProductInformation: "उत्पादनाची माहिती आणि विक्री किंमत भरा.",
    // Product statuses and actions
    confirmDelete: "हटवण्याची पुष्टी करा",

    productDeleted: "उत्पादन यशस्वीपणे हटवले.",

    productNotFound: "उत्पादन सापडले नाही",

    productNotFoundDescription:
      "हे उत्पादन हटवले असू शकते किंवा लिंक चुकीची असू शकते.",

    viewProducts: "उत्पादने पहा",

    editProductAction: "उत्पादन संपादित करा",

    deleteProductAction: "उत्पादन हटवा",
    // Customers
    totalCustomersLabel: "एकूण ग्राहक",

    customerDetails: "ग्राहकांची माहिती",

    customerName: "ग्राहकाचे नाव",

    shopName: "दुकानाचे नाव",

    ownerName: "मालकाचे नाव",

    gstin: "GSTIN",

    addFirstCustomer: "पहिला ग्राहक जोडा",

    noCustomersYet: "अद्याप ग्राहक नाहीत",

    noCustomersFound: "ग्राहक सापडले नाहीत",

    searchCustomers: "ग्राहक शोधा",

    searchCustomerPlaceholder: "ग्राहक, दुकान किंवा फोन शोधा...",

    customerAdded: "ग्राहक यशस्वीपणे जोडला.",

    customerUpdated: "ग्राहकाची माहिती अद्ययावत केली.",

    customerDeleted: "ग्राहक हटवला.",

    // Customer directory page
    customersDescription:
      "तुमची दुकाने, दुकानदार आणि ग्राहकांची माहिती व्यवस्थापित करा.",
    allRegisteredShops: "नोंदणीकृत सर्व दुकाने",
    searchResults: "शोधाचे निकाल",
    shopsMatchingSearch: "तुमच्या शोधाशी जुळणारी दुकाने",
    customerDirectoryDescription:
      "नोंदणीकृत ग्राहकांची माहिती पहा आणि व्यवस्थापित करा.",
    loadingCustomers: "ग्राहक लोड होत आहेत...",
    tryAnotherCustomer:
      "दुकानाचे नाव, मालकाचे नाव, फोन नंबर किंवा शहर बदलून पाहा.",
    addFirstCustomerDescription:
      "ग्राहकांची यादी तयार करण्यासाठी पहिले दुकान जोडा.",
    location: "ठिकाण",
    noEmailProvided: "ईमेल दिलेला नाही",
    notSpecified: "नमूद केलेले नाही",
    editCustomerAction: "ग्राहक संपादित करा",
    deleteCustomerAction: "ग्राहक हटवा",
    customerStorageNotice: "ग्राहकांची माहिती या ब्राउझरमध्ये जतन केली जाते.",
    deleteCustomerConfirm: '"{name}" हटवायचे आहे का?',
    deleteOrderConfirm: '"{name}" ही ऑर्डर हटवायची आहे का?',
    // Orders
    totalOrdersLabel: "एकूण ऑर्डर्स",

    newOrderTitle: "नवीन ऑर्डर तयार करा",

    orderDetails: "ऑर्डरची माहिती",

    orderNumber: "ऑर्डर क्रमांक",

    customer: "ग्राहक",

    selectCustomer: "ग्राहक निवडा",

    selectProduct: "उत्पादन निवडा",

    quantity: "प्रमाण",

    unitPrice: "प्रति एकक किंमत",

    discount: "सूट",

    subtotal: "उपएकूण",

    total: "एकूण",

    paymentMethod: "पेमेंट पद्धत",

    deliveryAddress: "वितरणाचा पत्ता",

    pending: "प्रलंबित",

    confirmed: "पुष्टी केलेली",

    dispatched: "पाठवलेली",

    delivered: "वितरित",

    cancelled: "रद्द",

    noOrdersYet: "अद्याप ऑर्डर्स नाहीत",

    noOrdersFound: "ऑर्डर्स सापडल्या नाहीत",

    searchOrders: "ऑर्डर्स शोधा",

    orderCreated: "ऑर्डर यशस्वीपणे तयार केली.",

    orderUpdated: "ऑर्डर अद्ययावत केली.",

    orderDeleted: "ऑर्डर हटवली.",

    updateStatus: "स्थिती अद्ययावत करा",

    cash: "रोख",

    bankTransfer: "बँक हस्तांतरण",

    upi: "UPI",

    other: "इतर",

    orderItems: "ऑर्डरमधील उत्पादने",

    addItem: "उत्पादन जोडा",

    removeItem: "उत्पादन काढा",
    // Orders page
    ordersDescription:
      "दुकानांच्या ऑर्डर्स व्यवस्थापित करा, प्रगती तपासा आणि एकूण रक्कम पाहा.",

    totalOrderValue: "ऑर्डर्सची एकूण रक्कम",

    allRecordedOrders: "नोंदवलेल्या सर्व ऑर्डर्स",

    awaitingConfirmation: "पुष्टीची प्रतीक्षा",

    excludesCancelledOrders: "रद्द केलेल्या ऑर्डर्स वगळून",

    searchAndUpdateOrders: "ऑर्डर्स शोधा आणि त्यांची स्थिती बदला.",

    searchOrderPlaceholder: "ऑर्डर, दुकान किंवा उत्पादन शोधा...",

    filterOrdersByStatus: "स्थितीनुसार ऑर्डर्स फिल्टर करा",

    loadingOrders: "ऑर्डर्स लोड होत आहेत...",

    noMatchingOrders: "जुळणाऱ्या ऑर्डर्स सापडल्या नाहीत",

    changeOrderFilters: "शोध किंवा स्थिती फिल्टर बदलून पाहा.",

    createFirstOrderDescription:
      "विक्रीचा मागोवा घेण्यासाठी पहिली ऑर्डर तयार करा.",

    clearFilters: "फिल्टर काढा",

    createFirstOrder: "पहिली ऑर्डर तयार करा",

    shop: "दुकान",

    items: "वस्तू",

    date: "दिनांक",

    productLine: "उत्पादन ओळ",

    productLines: "उत्पादन ओळी",

    deleteOrderAction: "ऑर्डर हटवा",

    createAnotherOrder: "आणखी एक ऑर्डर तयार करा",
    // Errors and validation
    somethingWentWrong: "काहीतरी चूक झाली.",

    fillRequiredFields: "कृपया सर्व आवश्यक माहिती भरा.",

    invalidEmail: "कृपया योग्य ईमेल पत्ता भरा.",

    invalidPhone: "कृपया योग्य फोन नंबर भरा.",

    tryAgain: "कृपया पुन्हा प्रयत्न करा.",

    noResults: "निकाल सापडले नाहीत",
  },

  hi: {
    // App and navigation
    appBrand: "एमराल्ड सेल्स",

    workspace: "बिक्री प्रबंधन",

    dashboard: "डैशबोर्ड",

    customers: "ग्राहक",

    products: "उत्पाद",

    orders: "ऑर्डर",

    newOrder: "नया ऑर्डर",

    addCustomer: "ग्राहक जोड़ें",

    addProduct: "उत्पाद जोड़ें",

    search: "खोजें...",

    settings: "प्राथमिकताएँ",

    appearance: "दिखावट",

    language: "भाषा",

    lightMode: "लाइट",

    darkMode: "डार्क",

    systemMode: "सिस्टम",
    // Dashboard
    welcome: "वापसी पर स्वागत है",

    overview: "यहाँ आपके व्यवसाय का विवरण है।",

    totalCustomers: "कुल ग्राहक",

    activeProducts: "सक्रिय उत्पाद",

    totalOrders: "कुल ऑर्डर",

    pendingOrders: "लंबित ऑर्डर",

    orderValue: "ऑर्डर का मूल्य",

    recentOrders: "हाल के ऑर्डर",

    viewAll: "सभी देखें",

    quickActions: "त्वरित कार्य",

    shopDirectory: "दुकानों की सूची",

    productCatalogue: "उत्पाद सूची",

    orderHistory: "ऑर्डर इतिहास",
    // Common actions
    save: "सहेजें",

    cancel: "रद्द करें",

    edit: "संपादित करें",

    delete: "हटाएँ",

    noData: "कोई रिकॉर्ड नहीं मिला",

    english: "English",

    marathi: "मराठी",

    hindi: "हिन्दी",

    loading: "लोड हो रहा है...",

    back: "वापस",

    close: "बंद करें",

    clear: "साफ़ करें",

    submit: "जमा करें",

    update: "अपडेट करें",

    actions: "कार्रवाई",

    status: "स्थिति",

    active: "सक्रिय",

    inactive: "निष्क्रिय",

    all: "सभी",

    allStatuses: "सभी स्थितियाँ",

    optional: "वैकल्पिक",

    required: "आवश्यक",

    description: "विवरण",

    notes: "टिप्पणियाँ",

    name: "नाम",

    email: "ईमेल",

    phone: "फ़ोन",

    address: "पता",

    city: "शहर",

    state: "राज्य",

    pincode: "पिन कोड",
    // Products page
    salesManagement: "बिक्री प्रबंधन",

    productsDescription: "उत्पादों, पैकेजिंग और बिक्री मूल्य का प्रबंधन करें।",

    totalProducts: "कुल उत्पाद",

    inactiveProducts: "निष्क्रिय उत्पाद",

    catalogueDescription: "उत्पाद की जानकारी और बिक्री मूल्य प्रबंधित करें।",

    searchProducts: "उत्पाद खोजें",

    searchProductPlaceholder: "उत्पाद, SKU, ब्रांड या श्रेणी खोजें...",

    clearSearch: "खोज हटाएँ",

    loadingProducts: "उत्पाद लोड हो रहे हैं...",

    noProductsFound: "कोई उत्पाद नहीं मिला",

    noProductsYet: "अभी कोई उत्पाद नहीं है",

    tryAnotherProduct: "दूसरा उत्पाद नाम, SKU, ब्रांड या श्रेणी खोजें।",

    addFirstProductDescription:
      "अपनी उत्पाद सूची बनाने के लिए पहला उत्पाद जोड़ें।",

    addFirstProduct: "पहला उत्पाद जोड़ें",

    product: "उत्पाद",

    sku: "SKU / उत्पाद कोड",

    category: "श्रेणी",

    sizeUnit: "आकार / इकाई",

    price: "मूल्य",

    noBrand: "ब्रांड निर्दिष्ट नहीं है",

    showing: "दिखाए जा रहे हैं",

    of: "में से",

    productsCount: "उत्पाद",

    localStorageNotice: "उत्पाद की जानकारी इस ब्राउज़र में सहेजी जाती है।",

    deleteProductConfirm: 'क्या आप "{name}" उत्पाद को हटाना चाहते हैं?',
    // Product form
    productDetails: "उत्पाद की जानकारी",

    editProduct: "उत्पाद संपादित करें",

    productCatalogueLabel: "उत्पाद सूची",

    productFormDescription:
      "मूल्य, पैकेजिंग और उपलब्धता के साथ नया उत्पाद जोड़ें।",

    editProductDescription: "उत्पाद की जानकारी और सूची अपडेट करें।",

    basicInformation: "मूल जानकारी",

    productName: "उत्पाद का नाम",

    productNameRequired: "उत्पाद का नाम आवश्यक है।",

    productNamePlaceholder: "इंटीरियर वॉल पेंट",

    skuPlaceholder: "PAINT-001",

    categoryPlaceholder: "पेंट, पेय पदार्थ, हार्डवेयर...",

    brand: "ब्रांड",

    brandPlaceholder: "ब्रांड का नाम",

    pricingPackaging: "मूल्य और पैकेजिंग",

    sizePackaging: "आकार / पैकेजिंग",

    sizePlaceholder: "1 लीटर, 20 लीटर, 250 मिली...",

    unit: "इकाई",

    piece: "नग",

    box: "डिब्बा",

    bottle: "बोतल",

    can: "कैन",

    litre: "लीटर",

    kilogram: "किलोग्राम",

    packet: "पैकेट",

    dozen: "दर्जन",

    sellingPrice: "बिक्री मूल्य",

    validPrice: "कृपया शून्य या उससे अधिक सही मूल्य दर्ज करें।",

    pricePerUnit: "चुनी गई प्रत्येक इकाई का बिक्री मूल्य दर्ज करें।",

    availableForOrders: "ऑर्डर के लिए उपलब्ध",

    availableDescription: "ग्राहक इस उत्पाद को ऑर्डर कर सकते हैं।",

    unavailableDescription: "यह उत्पाद नए ऑर्डर के लिए उपलब्ध नहीं होगा।",

    additionalDetails: "अतिरिक्त जानकारी",

    optionalField: "वैकल्पिक",

    productDescriptionPlaceholder:
      "उत्पाद की विशेषताएँ या अन्य उपयोगी जानकारी लिखें...",

    characters: "अक्षर",

    saveChanges: "बदलाव सहेजें",

    saveProduct: "उत्पाद सहेजें",

    saving: "सहेजा जा रहा है...",

    productSaveError: "उत्पाद सहेजा नहीं जा सका। कृपया पुनः प्रयास करें।",

    productSaved: "उत्पाद सफलतापूर्वक सहेजा गया।",

    cancelEditing: "संपादन रद्द करें",

    enterProductInformation: "उत्पाद की जानकारी और बिक्री मूल्य दर्ज करें।",
    // Product statuses and actions
    confirmDelete: "हटाने की पुष्टि करें",

    productDeleted: "उत्पाद सफलतापूर्वक हटाया गया।",

    productNotFound: "उत्पाद नहीं मिला",

    productNotFoundDescription:
      "यह उत्पाद हटाया गया हो सकता है या लिंक गलत हो सकता है।",

    viewProducts: "उत्पाद देखें",

    editProductAction: "उत्पाद संपादित करें",

    deleteProductAction: "उत्पाद हटाएँ",
    // Customers
    totalCustomersLabel: "कुल ग्राहक",

    customerDetails: "ग्राहक की जानकारी",

    customerName: "ग्राहक का नाम",

    shopName: "दुकान का नाम",

    ownerName: "मालिक का नाम",

    gstin: "GSTIN",

    addFirstCustomer: "पहला ग्राहक जोड़ें",

    noCustomersYet: "अभी कोई ग्राहक नहीं है",

    noCustomersFound: "कोई ग्राहक नहीं मिला",

    searchCustomers: "ग्राहक खोजें",

    searchCustomerPlaceholder: "ग्राहक, दुकान या फ़ोन खोजें...",

    customerAdded: "ग्राहक सफलतापूर्वक जोड़ा गया।",

    customerUpdated: "ग्राहक की जानकारी अपडेट की गई।",

    customerDeleted: "ग्राहक हटाया गया।",

    // Customer directory page
    customersDescription:
      "अपनी दुकानों, दुकानदारों और ग्राहकों की जानकारी प्रबंधित करें।",
    allRegisteredShops: "सभी पंजीकृत दुकानें",
    searchResults: "खोज परिणाम",
    shopsMatchingSearch: "आपकी खोज से मेल खाने वाली दुकानें",
    customerDirectoryDescription:
      "पंजीकृत ग्राहकों की जानकारी देखें और प्रबंधित करें।",
    loadingCustomers: "ग्राहक लोड हो रहे हैं...",
    tryAnotherCustomer:
      "दुकान का नाम, मालिक का नाम, फ़ोन नंबर या शहर बदलकर देखें।",
    addFirstCustomerDescription:
      "ग्राहकों की सूची बनाने के लिए पहली दुकान जोड़ें।",
    location: "स्थान",
    noEmailProvided: "ईमेल उपलब्ध नहीं है",
    notSpecified: "निर्दिष्ट नहीं है",
    editCustomerAction: "ग्राहक संपादित करें",
    deleteCustomerAction: "ग्राहक हटाएँ",
    customerStorageNotice: "ग्राहकों की जानकारी इस ब्राउज़र में सहेजी जाती है।",
    deleteCustomerConfirm: 'क्या आप "{name}" को हटाना चाहते हैं?',
    deleteOrderConfirm: 'क्या आप "{name}" ऑर्डर हटाना चाहते हैं?',
    // Orders
    totalOrdersLabel: "कुल ऑर्डर",

    newOrderTitle: "नया ऑर्डर बनाएँ",

    orderDetails: "ऑर्डर की जानकारी",

    orderNumber: "ऑर्डर नंबर",

    customer: "ग्राहक",

    selectCustomer: "ग्राहक चुनें",

    selectProduct: "उत्पाद चुनें",

    quantity: "मात्रा",

    unitPrice: "प्रति इकाई मूल्य",

    discount: "छूट",

    subtotal: "उप-योग",

    total: "कुल",

    paymentMethod: "भुगतान का तरीका",

    deliveryAddress: "डिलीवरी का पता",

    pending: "लंबित",

    confirmed: "पुष्टि की गई",

    dispatched: "भेज दिया गया",

    delivered: "डिलीवर किया गया",

    cancelled: "रद्द",

    noOrdersYet: "अभी कोई ऑर्डर नहीं है",

    noOrdersFound: "कोई ऑर्डर नहीं मिला",

    searchOrders: "ऑर्डर खोजें",

    orderCreated: "ऑर्डर सफलतापूर्वक बनाया गया।",

    orderUpdated: "ऑर्डर अपडेट किया गया।",

    orderDeleted: "ऑर्डर हटाया गया।",

    updateStatus: "स्थिति अपडेट करें",

    cash: "नकद",

    bankTransfer: "बैंक ट्रांसफर",

    upi: "UPI",

    other: "अन्य",

    orderItems: "ऑर्डर के उत्पाद",

    addItem: "उत्पाद जोड़ें",

    removeItem: "उत्पाद हटाएँ",
    // Orders page
    ordersDescription:
      "दुकान के ऑर्डर प्रबंधित करें, प्रगति ट्रैक करें और कुल राशि देखें।",

    totalOrderValue: "ऑर्डर की कुल राशि",

    allRecordedOrders: "सभी दर्ज किए गए ऑर्डर",

    awaitingConfirmation: "पुष्टि की प्रतीक्षा में",

    excludesCancelledOrders: "रद्द किए गए ऑर्डर शामिल नहीं हैं",

    searchAndUpdateOrders: "ऑर्डर खोजें और उनकी स्थिति अपडेट करें।",

    searchOrderPlaceholder: "ऑर्डर, दुकान या उत्पाद खोजें...",

    filterOrdersByStatus: "स्थिति के अनुसार ऑर्डर फ़िल्टर करें",

    loadingOrders: "ऑर्डर लोड हो रहे हैं...",

    noMatchingOrders: "कोई मेल खाता ऑर्डर नहीं मिला",

    changeOrderFilters: "अपनी खोज या स्थिति फ़िल्टर बदलकर देखें।",

    createFirstOrderDescription:
      "बिक्री ट्रैक करने के लिए अपना पहला ऑर्डर बनाएँ।",

    clearFilters: "फ़िल्टर साफ़ करें",

    createFirstOrder: "पहला ऑर्डर बनाएँ",

    shop: "दुकान",

    items: "वस्तुएँ",

    date: "दिनांक",

    productLine: "उत्पाद पंक्ति",

    productLines: "उत्पाद पंक्तियाँ",

    deleteOrderAction: "ऑर्डर हटाएँ",

    createAnotherOrder: "एक और ऑर्डर बनाएँ",
    // Errors and validation
    somethingWentWrong: "कुछ गलत हो गया।",

    fillRequiredFields: "कृपया सभी आवश्यक जानकारी भरें।",

    invalidEmail: "कृपया सही ईमेल पता दर्ज करें।",

    invalidPhone: "कृपया सही फ़ोन नंबर दर्ज करें।",

    tryAgain: "कृपया पुनः प्रयास करें।",

    noResults: "कोई परिणाम नहीं मिला",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
