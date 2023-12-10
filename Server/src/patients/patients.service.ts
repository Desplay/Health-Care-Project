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
    patientTransformed.createdAt = new Date();
    patientTransformed.nowOn = 'Lobby';
    const newPatient = new this.patientModel(patientTransformed);
    return await newPatient.save();
  }

  async getPatientById(id: string): Promise<PatientEntity> {
    return await this.patientModel.findById(id);
  }

  async editPatient(id: string, patient: PatientInput): Promise<PatientEntity> {
    const patientTransformed = new PatientInputtoEntity().transform(patient);
    const diseaseId = await this.diseaseService.throwDiseaseID(
      patient.diseaseID,
    );
    patientTransformed.disease = diseaseId;
    const _id = await this.throwPatientIDdbyPhyID(id);
    return await this.patientModel.findByIdAndUpdate(_id, patientTransformed);
  }

  async getTenPatientsHighestRisk(): Promise<PatientEntity[]> {
    const data = await this.patientModel.aggregate([
      {
        $lookup: {
          from: 'diseases',
          localField: 'disease',
          foreignField: '_id',
          as: 'disease',
        },
      },
    ]);
    data.sort((a, b) => {
      return a.disease[0].prioritized - b.disease[0].prioritized;
    });
    data.map((patient) => {
      patient.disease[0] = patient.disease[0]._id;
      patient.disease = patient.disease[0];
    });
    return data;
  }
  async getAllPatients(): Promise<PatientEntity[]> {
    return await this.patientModel.find();
  }

  async throwPatientIDdbyPhyID(patientID: string): Promise<string> {
    return (await this.patientModel.findOne({ PhyID: patientID }))._id;
  }
}
