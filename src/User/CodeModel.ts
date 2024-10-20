import { Schema, model, Document } from 'mongoose';

export interface ValidationCode extends Document {
  user_email: string;
  code: string;
  created_at: Date;
}

export interface CodeResponse {
  user_email: string,
  code: string,
  expiration?: Date,
}

export interface ResendResponse {
  email: string,
  code: string,
  password: string,
  confirm_password: string;
}

const ValidationCodeSchema = new Schema<ValidationCode>({
  user_email: { type: String, required: true },
  code: { type: String, required: true },
  created_at: { type: Date, default: Date.now, expires: '24h' }
}, {
  collection: 'validation_codes'
});

export const ValidationCodeModel = model<ValidationCode>('ValidationCode', ValidationCodeSchema);
