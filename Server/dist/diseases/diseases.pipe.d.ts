import { PipeTransform } from '@nestjs/common';
import { Disease as DiseaseEntity } from './datatype/disease.entity';
import { DiseaseDTO } from './datatype/disease.dto';
export declare class DiseaseEntitytoDTO implements PipeTransform {
    transform(value: DiseaseEntity): DiseaseDTO;
}
export declare class DiseaseInputtoEntity implements PipeTransform {
    transform(value: any): DiseaseEntity;
}
export declare class DiseasesPipe {
    diseaseInputtoEntity: DiseaseInputtoEntity;
    diseaseEntitytoDTO: DiseaseEntitytoDTO;
}
