import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PatientsService } from './patients.service';
import { PatientDTO, PatientInput } from './datatype/patient.dto';
import { ForbiddenException } from '@nestjs/common';
import { PatientEntitytoDTO } from './patients.pipe';

@Resolver()
export class PatientsResolver {
  constructor(private readonly patientsService: PatientsService) {}

  @Mutation(() => String)
  async createPatient(
    @Args({ name: 'patientInput', type: () => PatientInput })
    patientInput: PatientInput,
  ): Promise<string> {
    await this.patientsService.createPatient(patientInput);
    return 'Patient created!';
  }

  @Query(() => PatientDTO)
  async getDetailsPatient(
    @Args({ name: 'patientID', type: () => String }) patientID: string,
  ): Promise<PatientDTO> {
    console.log(patientID);
    const patientData = await this.patientsService.getPatientById(patientID);
    if (!patientData) throw new ForbiddenException('Patient not found!');
    const patientReturn = new PatientEntitytoDTO().transform(patientData);
    return patientReturn;
  }

  @Query(() => String)
  async editPatient(
    @Args({ name: 'patientID', type: () => String }) patientID: string,
    @Args({ name: 'patientInput', type: () => PatientInput })
    patientInput: PatientInput,
  ): Promise<string> {
    const patientFound = await this.patientsService.getPatientById(patientID);
    if (!patientFound) throw new ForbiddenException('Patient not found!');
    await this.patientsService.editPatient(patientID, patientInput);
    return 'Patient edited!';
  }

  @Query(() => [PatientDTO])
  async getTenPatientsHighestRisk(): Promise<PatientDTO[]> {
    const patientsData = await this.patientsService.getTenPatientsHighestRisk();
    if (patientsData.length === 0)
      throw new ForbiddenException('No patients found!');
    const patientsReturn = patientsData.map((patient) => {
      return new PatientEntitytoDTO().transform(patient);
    });
    return patientsReturn;
  }

  @Query(() => [PatientDTO])
  async getAllPatients(): Promise<PatientDTO[]> {
    const patientsData = await this.patientsService.getAllPatients();
    if (patientsData.length === 0)
      throw new ForbiddenException('No patients found!');
    const patientsReturn = patientsData.map((patient) => {
      return new PatientEntitytoDTO().transform(patient);
    });
    return patientsReturn;
  }
}
