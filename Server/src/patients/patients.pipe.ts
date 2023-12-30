import { Injectable, PipeTransform } from '@nestjs/common';
import { PatientDTO, PatientInput } from './datatype/patient.dto';
import { Patient as PatientEntity } from './datatype/patient.entity';

@Injectable()
export class PatientInputtoEntity implements PipeTransform {
  transform(value: PatientInput): PatientEntity {
    const newValue: PatientEntity = {
      PatientID: null,
      PhyID: null,
      name: value.name,
      age: value.age,
      gender: value.gender,
      disease: null,
      message: value.message ? value.message : '',
      createdAt: null,
      nowOn: null,
    };
    return newValue;
  }
}

@Injectable()
export class PatientEntitytoDTO implements PipeTransform {
  transform(value: PatientEntity): PatientDTO {
    const time = value.createdAt.getTime();
    const createdAt =
      (Number(new Date(time).getHours()) < 10
        ? '0' + new Date(time).getHours()
        : new Date(time).getHours()) +
      ':' +
      (Number(new Date(time).getMinutes()) < 10
        ? '0' + new Date(time).getMinutes()
        : new Date(time).getMinutes()) +
      ' - ' +
      new Date(time).toLocaleDateString('vi-VN');

    const newValue: PatientDTO = {
      patientID: value.PatientID,
      PhyID: value.PhyID,
      name: value.name,
      age: value.age,
      gender: value.gender,
      disease: null,
      createdAt: createdAt,
      message: value.message,
    };
    return newValue;
  }
}

export class PatientPipe {
  patientInputtoEntity: PatientInputtoEntity;
  patientEntitytoDTO: PatientEntitytoDTO;
}
