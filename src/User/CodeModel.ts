import { Schema, model, Document } from 'mongoose';

export interface ValidationCode extends Document {
  user_id: string;
  code: string;
  createdAt: Date;
}

const ValidationCodeSchema = new Schema<ValidationCode>({
  user_id: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '24h' }
}, {
  collection: 'validation_codes'
});

export const ValidationCodeModel = model<ValidationCode>('ValidationCode', ValidationCodeSchema);
