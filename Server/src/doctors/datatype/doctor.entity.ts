import { Document, Schema, model } from 'mongoose';

export class Doctor {
  PhyID: string;
  name: string;
  specialist: string;
  maxCapacity: number;
}

export interface DoctorEntity extends Doctor, Document {}

export const DoctorSchema = new Schema<DoctorEntity>({
  PhyID: { type: String, required: true },
  name: { type: String, required: true },
  specialist: { type: String, required: true },
  maxCapacity: { type: Number, required: true },
});

export const DoctorModel = model<DoctorEntity>('Doctor', DoctorSchema);
