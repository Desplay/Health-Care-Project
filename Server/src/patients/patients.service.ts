import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PatientEntity } from './datatype/patient.entity';
import { PatientInput } from './datatype/patient.dto';
import { PatientInputtoEntity } from './patients.pipe';
import { DiseasesService } from 'src/diseases/diseases.service';
import padZeros from 'src/utils/padZeros';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel('Patient')
    private readonly patientModel: Model<PatientEntity>,
    private readonly diseaseService: DiseasesService,
    private readonly doctorService: DoctorsService,
  ) {}

  async createPatient(patient: PatientInput): Promise<PatientEntity> {
    const patientTransformed = new PatientInputtoEntity().transform(patient);
    const patientCount = await this.patientModel.count();
    const diseaseId = await this.diseaseService.throwDiseaseID(
      patient.diseaseID,
    );
    const disease = await this.diseaseService.getDiseaseById(
      diseaseId.toString(),
    );
    patientTransformed.disease = disease._id;
    patientTransformed.PhyID = `BN${padZeros(patientCount + 1)}`;
    patientTransformed.createdAt = new Date();
    patientTransformed.nowOn = 'Lobby';
    const newPatient = new this.patientModel(patientTransformed);
    return await newPatient.save();
  }

  async getPatientById(id: string): Promise<PatientEntity> {
    return await this.patientModel.findById(id);
  }

  async editPatient(id: string, patient: any): Promise<PatientEntity> {
    const diseaseId = await this.diseaseService.throwDiseaseID(
      patient.diseaseID,
    );
    const disease = await this.diseaseService.getDiseaseById(
      diseaseId.toString(),
    );
    patient.disease = disease._id;
    return await this.patientModel.findByIdAndUpdate(id, patient);
    // return await this.patientModel.findByIdAndUpdate(id, patientTransformed);
  }

  async getTenPatientsHighestRisk(): Promise<PatientEntity[]> {
    const data = await this.patientModel.aggregate([
      {
        $match: {
          nowOn: 'Lobby',
        },
      },
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

  async getPatientsByDoctorPhyId(PhyID: string): Promise<PatientEntity[]> {
    const patient = await this.patientModel.find({ nowOn: PhyID });
    return patient;
  }

  async getPatientsInQueue(): Promise<PatientEntity[]> {
    const data = await this.patientModel.aggregate([
      {
        $match: {
          nowOn: 'Queue',
        },
      },
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
      return a.createdAt.getTime() - b.createdAt.getTime();
    });
    data.map((patient) => {
      patient.disease[0] = patient.disease[0]._id;
      patient.disease = patient.disease[0];
    });
    return data;
  }

  async movePatientToQueue(): Promise<PatientEntity> {
    const patients = await this.getTenPatientsHighestRisk();
    const patient = patients[0];
    patient.nowOn = 'Queue';
    return await this.patientModel.findByIdAndUpdate(patient._id, patient);
  }

  async movePatientToDoctor(): Promise<PatientEntity> {
    const patients = await this.patientModel.aggregate([
      {
        $match: {
          nowOn: 'Queue',
        },
      },
      {
        $lookup: {
          from: 'diseases',
          localField: 'disease',
          foreignField: '_id',
          as: 'disease',
        },
      },
    ]);
    const doctors = await this.doctorService.getDoctors();
    for await (const patient of patients) {
      for await (const doctor of doctors) {
        const patients = await this.getPatientsByDoctorPhyId(doctor.PhyID);
        if (
          patients.length < doctor.maxCapacity &&
          doctor.specialist == patient.disease[0].specialist
        ) {
          patient.nowOn = doctor.PhyID;
          patient.disease = patient.disease[0]._id;
          return await this.patientModel.findByIdAndUpdate(
            patient._id,
            patient,
          );
        }
      }
    }
    return;
  }

  async getAllPatients(): Promise<PatientEntity[]> {
    return await this.patientModel.find();
  }

  async deletePatient(patientID: string): Promise<PatientEntity> {
    return await this.patientModel.findByIdAndDelete(patientID);
  }
}
