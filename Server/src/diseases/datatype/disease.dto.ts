import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DiseaseDTO {
  @Field(() => String)
  diseaseID: string;

  @Field(() => String)
  diseaseName: string;
}

@ObjectType()
export class Diseases {
  @Field(() => [DiseaseDTO])
  Diseases: DiseaseDTO[];
}
