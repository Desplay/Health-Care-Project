import { Injectable, PipeTransform } from '@nestjs/common';
import { Disease as DiseaseEntity } from './datatype/disease.entity';
import { DiseaseDTO } from './datatype/disease.dto';

@Injectable()
export class DiseaseEntitytoDTO implements PipeTransform {
  transform(value: DiseaseEntity): DiseaseDTO {
    const { diseaseID, diseaseName, description } = value;
    return {
      diseaseID,
      diseaseName,
      diseaseDescription: description,
    };
  }
}

@Injectable()
export class DiseaseInputtoEntity implements PipeTransform {
  transform(value: any): DiseaseEntity {
    const { diseaseName, specialist, prioritized, diseaseDescription } = value;
    if (diseaseDescription === undefined) {
      return {
        diseaseID: null,
        diseaseName: diseaseName ? diseaseName : value.name,
        specialist,
        prioritized,
      };
    }
    return {
      diseaseID: null,
      diseaseName: diseaseName ? diseaseName : value.name,
      specialist,
      prioritized,
      description: diseaseDescription,
    };
  }
}

export class DiseasesPipe {
  diseaseInputtoEntity: DiseaseInputtoEntity;
  diseaseEntitytoDTO: DiseaseEntitytoDTO;
}
