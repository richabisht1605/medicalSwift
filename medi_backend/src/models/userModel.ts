import mongoose, { Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address?: string;
  role: "user" | "rider";
  ambulanceName?: string;
  ambulanceNumber?: string;
  hasMedicalTraining?: boolean;
  imageUrl?: string;
}

const userSchema: Schema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["user", "rider"], required: true },
    ambulanceName: { type: String },
    ambulanceNumber: { type: String },
    hasMedicalTraining: { type: Boolean },
    imageUrl: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
