import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { PatientDTO } from 'src/patients/datatype/patient.dto';

@ObjectType()
export class DoctorDTO {
  @Field(() => String)
  id: string;

  @Field(() => String)
  PhyID: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  specialist: string;

  @Field(() => Number)
  maxCapacity: number;

  @Field(() => [PatientDTO])
  patients: PatientDTO[];
}

@InputType()
export class DoctorInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  specialist: string;

  @Field(() => Number)
  maxCapacity: number;
}
