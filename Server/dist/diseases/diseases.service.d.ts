import { Model } from 'mongoose';
import { DiseaseEntity } from './datatype/disease.entity';
export declare class DiseasesService {
    private readonly diseaseModel;
    constructor(diseaseModel: Model<DiseaseEntity>);
    createDisease(disease: any): Promise<DiseaseEntity>;
    getDisease(disease: string): Promise<DiseaseEntity>;
    getDiseaseById(Id: string): Promise<DiseaseEntity>;
    throwDiseaseID(diseaseID: string): Promise<string>;
    getDiseases(): Promise<DiseaseEntity[]>;
}
