import { Injectable, PipeTransform } from '@nestjs/common';
import { Doctor as DoctorEntity } from './datatype/doctor.entity';
import { DoctorInput, DoctorDTO } from './datatype/doctor.dto';

@Injectable()
export class DoctorEntitytoDTO implements PipeTransform {
  transform(value: DoctorEntity): DoctorDTO {
    const { PhyID, name, specialist, maxCapacity } = value;
    return {
      id: null,
      PhyID,
      name,
      specialist,
      maxCapacity: maxCapacity,
      patients: [],
    };
  }
}

@Injectable()
export class DoctorInputtoEntity implements PipeTransform {
  transform(value: DoctorInput): DoctorEntity {
    const { name, specialist, maxCapacity } = value;
    return {
      PhyID: null,
      name,
      specialist,
      maxCapacity: maxCapacity,
    };
  }
}

export class DoctorPipe {
  doctorEntitytoDTO: DoctorEntitytoDTO;
  doctorInputtoEntity: DoctorInputtoEntity;
}
