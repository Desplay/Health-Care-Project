import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientEntity } from './datatype/patient.entity';
import { PatientInput } from './datatype/patient.dto';
import { PatientInputtoEntity } from './patients.pipe';
import { DiseasesService } from 'src/diseases/diseases.service';
import padZeros from 'src/utils/padZeros';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel('Patient')
    private readonly patientModel: Model<PatientEntity>,
    private readonly diseaseService: DiseasesService,
  ) {}

  async createPatient(patient: PatientInput): Promise<PatientEntity> {
    const patientTransformed = new PatientInputtoEntity().transform(patient);
    const patientCount = await this.patientModel.count();
    const diseaseId = await this.diseaseService.throwDiseaseID(
      patient.diseaseID,
    );
    patientTransformed.disease = diseaseId;
    patientTransformed.PhyID = `BN${padZeros(patientCount + 1)}`;
    const newPatient = new this.patientModel(patientTransformed);
    return await newPatient.save();
  }

  async getPatientById(id: string): Promise<PatientEntity> {
    return await this.patientModel.findById(id);
  }

  async getTenPatientsHighestRisk(): Promise<PatientEntity[]> {
    const data = await this.patientModel.aggregate([
      { $group: { _id: '$disease', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'diseases',
          localField: '_id',
          foreignField: '_id',
          as: 'disease',
        },
      },
      { $unwind: '$disease' },
      {
        $project: {
          _id: 0,
          diseaseID: '$disease.diseaseID',
          disease: '$disease.disease',
          count: 1,
        },
      },
    ]);
    console.log(data);
    return data;
  }
  async getAllPatients(): Promise<PatientEntity[]> {
    return await this.patientModel.find();
  }
}
