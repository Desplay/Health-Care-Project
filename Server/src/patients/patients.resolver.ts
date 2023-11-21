import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PatientsService } from './patients.service';
import { PatientInput } from './datatype/patient.dto';

@Resolver()
export class PatientsResolver {
  constructor(private readonly patientsService: PatientsService) {}

  @Mutation(() => String)
  async createPatient(
    @Args({ name: 'patient', type: () => PatientInput })
    patient: PatientInput,
  ): Promise<string> {
    await this.patientsService.createPatient(patient);
    return 'Patient created!';
  }

  @Query(() => String)
  async getTenPatientsHighestRisk(): Promise<string> {
    await this.patientsService.getTenPatientsHighestRisk();
    return 'Patient created!';
  }
}
