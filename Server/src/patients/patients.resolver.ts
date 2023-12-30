import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PatientsService } from './patients.service';
import { PatientDTO, PatientInput } from './datatype/patient.dto';
import { ForbiddenException } from '@nestjs/common';
import { PatientEntitytoDTO } from './patients.pipe';
import { PubSub } from 'graphql-subscriptions';
import { DiseasesService } from 'src/diseases/diseases.service';

const pubSub = new PubSub();

@Resolver()
export class PatientsResolver {
  constructor(
    private readonly patientsService: PatientsService,
    private readonly diseasesService: DiseasesService,
  ) {}

  @Mutation(() => String)
  async createPatient(
    @Args({ name: 'patientInput', type: () => PatientInput })
    patientInput: PatientInput,
  ): Promise<string> {
    await this.patientsService.createPatient(patientInput);
    pubSub.publish('patientAdded', { patientAdded: patientInput });
    return 'Patient created!';
  }

  @Query(() => PatientDTO)
  async getDetailsPatient(
    @Args({ name: 'patientID', type: () => String }) patientID: string,
  ): Promise<PatientDTO> {
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
    const patientsReturn = [];
    for await (const patient of patientsData) {
      const diseaseData = await this.diseasesService.getDiseaseById(
        patient.disease.toString(),
      );
      const new_patient = new PatientEntitytoDTO().transform(patient);
      new_patient.disease = diseaseData;
      new_patient.patientID = patient._id;
      patientsReturn.push(new_patient);
    }
    return patientsReturn;
  }

  @Query(() => [PatientDTO])
  async getPatientsInQueue(): Promise<PatientDTO[]> {
    const patientsData = await this.patientsService.getPatientsInQueue();
    if (patientsData.length === 0)
      throw new ForbiddenException('No patients found!');
    const patientsReturn = [];
    for await (const patient of patientsData) {
      const diseaseData = await this.diseasesService.getDiseaseById(
        patient.disease.toString(),
      );
      const new_patient = new PatientEntitytoDTO().transform(patient);
      new_patient.disease = diseaseData;
      new_patient.patientID = patient._id;
      patientsReturn.push(new_patient);
    }
    return patientsReturn;
  }

  @Query(() => [PatientDTO])
  async getAllPatients(): Promise<PatientDTO[]> {
    const patientsData = await this.patientsService.getAllPatients();
    if (patientsData.length === 0)
      throw new ForbiddenException('No patients found!');
    const patientsReturn = patientsData.map((patient) => {
      const new_patient = new PatientEntitytoDTO().transform(patient);
      new_patient.patientID = patient._id;
      return new_patient;
    });
    return patientsReturn;
  }

  @Mutation(() => String)
  async movePatientToQueue(): Promise<string> {
    await this.patientsService.movePatientToQueue();
    return 'Patient moved to queue!';
  }

  @Mutation(() => String)
  async deletePatient(
    @Args({ name: 'patientID', type: () => String }) patientID: string,
  ): Promise<string> {
    const patientFound = await this.patientsService.getPatientById(patientID);
    if (!patientFound) throw new ForbiddenException('Patient not found!');
    await this.patientsService.deletePatient(patientID);
    return 'Patient deleted!';
  }
}
