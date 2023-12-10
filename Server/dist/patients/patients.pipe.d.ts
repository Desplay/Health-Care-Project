import { PipeTransform } from '@nestjs/common';
import { PatientDTO, PatientInput } from './datatype/patient.dto';
import { Patient as PatientEntity } from './datatype/patient.entity';
export declare class PatientInputtoEntity implements PipeTransform {
    transform(value: PatientInput): PatientEntity;
}
export declare class PatientEntitytoDTO implements PipeTransform {
    transform(value: PatientEntity): PatientDTO;
}
export declare class PatientPipe {
    patientInputtoEntity: PatientInputtoEntity;
    patientEntitytoDTO: PatientEntitytoDTO;
}
