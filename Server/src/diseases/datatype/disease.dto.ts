import { ObjectType, Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class DiseaseDTO {
  @Field(() => String)
  diseaseID: string;

  @Field(() => String)
  diseaseName: string;

  @Field(() => String, { nullable: true })
  diseaseDescription?: string;
}

@ObjectType()
export class Diseases {
  @Field(() => [DiseaseDTO])
  Diseases: DiseaseDTO[];
}

@InputType()
export class DiseaseInput {
  @IsNotEmpty()
  @Field(() => String)
  diseaseName: string;

  @IsNotEmpty()
  @Field(() => String)
  specialist: string;

  @IsNotEmpty()
  @Field(() => Int)
  prioritized: number;

  @Field(() => String, { nullable: true })
  diseaseDescription?: string;
}
