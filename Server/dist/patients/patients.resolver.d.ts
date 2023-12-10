import { PatientsService } from './patients.service';
import { PatientDTO, PatientInput } from './datatype/patient.dto';
export declare class PatientsResolver {
    private readonly patientsService;
    constructor(patientsService: PatientsService);
    createPatient(patientInput: PatientInput): Promise<string>;
    getDetailsPatient(patientID: string): Promise<PatientDTO>;
    editPatient(patientID: string, patientInput: PatientInput): Promise<string>;
    getTenPatientsHighestRisk(): Promise<PatientDTO[]>;
    getAllPatients(): Promise<PatientDTO[]>;
}
