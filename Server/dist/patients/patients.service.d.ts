import { Model } from 'mongoose';
import { PatientEntity } from './datatype/patient.entity';
import { PatientInput } from './datatype/patient.dto';
import { DiseasesService } from 'src/diseases/diseases.service';
export declare class PatientsService {
    private readonly patientModel;
    private readonly diseaseService;
    constructor(patientModel: Model<PatientEntity>, diseaseService: DiseasesService);
    createPatient(patient: PatientInput): Promise<PatientEntity>;
    getPatientById(id: string): Promise<PatientEntity>;
    editPatient(id: string, patient: PatientInput): Promise<PatientEntity>;
    getTenPatientsHighestRisk(): Promise<PatientEntity[]>;
    getAllPatients(): Promise<PatientEntity[]>;
    throwPatientIDdbyPhyID(patientID: string): Promise<string>;
}
