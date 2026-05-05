import mongoose, { Schema, model, models } from "mongoose";

export interface ITransactionItem {
  menuItem: mongoose.Types.ObjectId;
  name: string;
  price: number;
  qty: number;
}

export interface ITransaction {
  items: ITransactionItem[];
  customerName: string;
  customerPhone: string;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: "cash" | "qris";
  amountPaid: number;
  change: number;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    items: [
      {
        menuItem: { type: Schema.Types.ObjectId, ref: "MenuItem" },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
      },
    ],
    customerName: { type: String, default: "" },
    customerPhone: { type: String, default: "" },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["cash", "qris"],
      required: true,
    },
    amountPaid: { type: Number, required: true },
    change: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Transaction =
  (models.Transaction as mongoose.Model<ITransaction>) ||
  model<ITransaction>("Transaction", TransactionSchema);

export default Transaction;
