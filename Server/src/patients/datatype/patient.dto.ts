import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { DiseaseDTO } from 'src/diseases/datatype/disease.dto';

@ObjectType()
export class PatientDTO {
  @Field(() => String)
  patientID: string;

  @Field(() => String)
  PhyID: string;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  age: number;

  @Field(() => String)
  gender: string;

  @Field(() => DiseaseDTO)
  disease: DiseaseDTO;

  @Field(() => String, { nullable: true })
  message: string;

  @Field(() => String)
  createdAt: string;
}

@InputType()
export class PatientInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Field(() => Int)
  age: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  gender: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  diseaseID: string;

  @IsString()
  @Field(() => String, { nullable: true })
  message?: string;
}
