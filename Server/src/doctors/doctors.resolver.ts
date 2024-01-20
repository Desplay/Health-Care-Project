import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { DoctorsService } from './doctors.service';
import { DoctorDTO } from './datatype/doctor.dto';
import { ForbiddenException } from '@nestjs/common';
import { PatientsService } from 'src/patients/patients.service';
import { DiseasesService } from 'src/diseases/diseases.service';
import { PatientEntitytoDTO } from 'src/patients/patients.pipe';

@Resolver()
export class DoctorsResolver {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly patientsService: PatientsService,
    private readonly diseasesService: DiseasesService,
  ) {}

  @Query(() => [DoctorDTO])
  async getDoctors() {
    const doctors = await this.doctorsService.getDoctors();
    if (!doctors) {
      throw new ForbiddenException('No doctors found');
    }
    const doctorsWithPatients = [];
    for await (const doctor of doctors) {
      const patients = await this.patientsService.getPatientsByDoctorPhyId(
        doctor.PhyID,
      );
      const patientsWithDisease = [];
      for await (const patient of patients) {
        const disease = await this.diseasesService.getDiseaseById(
          patient.disease.toString(),
        );
        const new_patient = {
          ...new PatientEntitytoDTO().transform(patient),
          patientID: patient._id,
          disease,
        };
        patientsWithDisease.push(new_patient);
      }
      const new_doctor = new DoctorDTO();
      new_doctor.id = doctor.id;
      new_doctor.PhyID = doctor.PhyID;
      new_doctor.name = doctor.name;
      new_doctor.patients = patientsWithDisease;
      new_doctor.maxCapacity = doctor.maxCapacity;
      doctorsWithPatients.push(new_doctor);
    }
    return doctorsWithPatients;
  }

  @Query(() => DoctorDTO)
  async getDoctorById(
    @Args('Doctor_id', { type: () => String }) Doctor_id: string,
  ) {
    const doctor = await this.doctorsService.getDoctorById(Doctor_id);
    if (!doctor) {
      throw new ForbiddenException('No doctors found');
    }
    const patients = await this.patientsService.getPatientsByDoctorPhyId(
      doctor.PhyID,
    );
    const patientsWithDisease = [];
    for await (const patient of patients) {
      const disease = await this.diseasesService.getDiseaseById(
        patient.disease.toString(),
      );
      const new_patient = {
        ...new PatientEntitytoDTO().transform(patient),
        patientID: patient._id,
        disease,
      };
      patientsWithDisease.push(new_patient);
    }
    const new_doctor = new DoctorDTO();
    new_doctor.id = doctor.id;
    new_doctor.PhyID = doctor.PhyID;
    new_doctor.name = doctor.name;
    new_doctor.patients = patientsWithDisease;
    new_doctor.maxCapacity = doctor.maxCapacity;
    return new_doctor;
  }

  @Mutation(() => String)
  async doneFirstPatient(
    @Args('Doctor_id', { type: () => String }) Doctor_id: string,
  ) {
    const doctor = await this.doctorsService.getDoctorById(Doctor_id);
    const patients = await this.patientsService.getPatientsByDoctorPhyId(
      doctor.PhyID,
    );
    const patientRemove = await this.patientsService.deletePatient(
      patients[0]._id,
    );
    if (!patientRemove) {
      throw new ForbiddenException('No patients found');
    }
    return 'Patient Done!';
  }
}
