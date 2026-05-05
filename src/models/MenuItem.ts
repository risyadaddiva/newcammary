import mongoose, { Schema, model, models } from "mongoose";

export interface IMenuItem {
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const MenuItem =
  (models.MenuItem as mongoose.Model<IMenuItem>) ||
  model<IMenuItem>("MenuItem", MenuItemSchema);

export default MenuItem;
