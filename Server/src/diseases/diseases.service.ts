import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DiseaseEntity } from './datatype/disease.entity';
import padZeros from 'src/utils/padZeros';
import { DiseaseInputtoEntity } from './diseases.pipe';

@Injectable()
export class DiseasesService {
  constructor(
    @InjectModel('Disease')
    private readonly diseaseModel: Model<DiseaseEntity>,
  ) {}

  async createDisease(disease: any): Promise<DiseaseEntity> {
    const diseaseTransformed = new DiseaseInputtoEntity().transform(disease);
    const diseaseCount = await this.diseaseModel.count();
    diseaseTransformed.diseaseID = `DN${padZeros(diseaseCount + 1)}`;
    const newDisease = new this.diseaseModel(diseaseTransformed);
    return await newDisease.save();
  }

  async getDisease(disease: string): Promise<DiseaseEntity> {
    return await this.diseaseModel.findOne({
      $or: [{ diseaseID: disease }, { diseaseName: disease }],
    });
  }

  async getDiseaseById(Id: string): Promise<DiseaseEntity> {
    return await this.diseaseModel.findById(Id);
  }

  async throwDiseaseID(diseaseID: string): Promise<string> {
    return (await this.diseaseModel.findOne({ diseaseID }))._id;
  }

  async getDiseases(): Promise<DiseaseEntity[]> {
    return await this.diseaseModel.find();
  }
}
