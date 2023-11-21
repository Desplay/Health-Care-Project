import { Document, Schema, model } from 'mongoose';

export class Patient {
  PhyID: string;
  name: string;
  age: number;
  gender: string;
  disease: { type: Schema.Types.ObjectId; ref: 'Disease' } | string;
  message: string;
  createdAt: Date;
}

export interface PatientEntity extends Patient, Document {}

export const PatientSchema = new Schema<PatientEntity>({
  PhyID: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  disease: {
    type: Schema.Types.ObjectId,
    ref: 'Disease',
    required: true,
  },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const PatientModel = model<PatientEntity>('Patient', PatientSchema);
