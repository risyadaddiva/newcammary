export interface MenuItemType {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem extends MenuItemType {
  qty: number;
}

export interface TransactionType {
  _id: string;
  items: {
    menuItem: string;
    name: string;
    price: number;
    qty: number;
  }[];
  customerName: string;
  customerPhone: string;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: "cash" | "qris";
  amountPaid: number;
  change: number;
  createdAt: string;
}
