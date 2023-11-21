import { Schema, model, Document } from 'mongoose';

export class Disease {
  diseaseID: string;
  diseaseName: string;
  prioritized: number;
  specialist: string;
}

export interface DiseaseEntity extends Disease, Document {}

export const DiseaseSchema = new Schema<DiseaseEntity>({
  diseaseID: { type: String, required: true },
  diseaseName: { type: String, required: true },
  prioritized: { type: Number, required: true },
  specialist: { type: String, required: true },
});

export const DiseaseModel = model<DiseaseEntity>('Disease', DiseaseSchema);
