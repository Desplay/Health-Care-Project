import { Injectable, PipeTransform } from '@nestjs/common';
import { Disease as DiseaseEntity } from './datatype/disease.entity';

@Injectable()
export class DiseasesPipe implements PipeTransform {
  transform(value: any): DiseaseEntity {
    const { name, specialist, prioritized } = value;
    return {
      diseaseID: null,
      diseaseName: name,
      specialist,
      prioritized,
    };
  }
}
