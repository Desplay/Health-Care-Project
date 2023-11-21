import { Injectable, PipeTransform } from '@nestjs/common';
import { PatientDTO, PatientInput } from './datatype/patient.dto';
import { Patient as PatientEntity } from './datatype/patient.entity';

@Injectable()
export class PatientDTOtoEntity implements PipeTransform {
  transform(value: PatientDTO): PatientEntity {
    const newValue: PatientEntity = {
      PhyID: null,
      name: value.name,
      age: value.age,
      gender: null,
      disease: null,
      message: value.message,
      createdAt: null,
    };
    return newValue;
  }
}

@Injectable()
export class PatientInputtoEntity implements PipeTransform {
  transform(value: PatientInput): PatientEntity {
    const newValue: PatientEntity = {
      PhyID: null,
      name: value.name,
      age: value.age,
      gender: value.gender,
      disease: null,
      message: value.message,
      createdAt: null,
    };
    return newValue;
  }
}

export class PatientPipe {
  patientDTOtoEntity: PatientDTOtoEntity;
  patientInputtoEntity: PatientInputtoEntity;
}
