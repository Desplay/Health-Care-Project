import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorEntity } from './datatype/doctor.entity';
import { DoctorEntitytoDTO } from './doctors.pipe';
import { DoctorDTO } from './datatype/doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectModel('Doctor') private readonly doctorModel: Model<DoctorEntity>,
  ) {}

  async getDoctors(): Promise<DoctorDTO[]> {
    const doctors = await this.doctorModel.find();
    const doctorsWithPatients = [];
    for await (const doctor of doctors) {
      const new_doctor = new DoctorEntitytoDTO().transform(doctor);
      new_doctor.id = doctor._id;
      doctorsWithPatients.push(new_doctor);
    }
    return doctorsWithPatients;
  }

  async getDoctorById(id: string): Promise<DoctorDTO> {
    const doctor = await this.doctorModel.findById(id);
    const new_doctor = new DoctorEntitytoDTO().transform(doctor);
    new_doctor.id = doctor._id;
    return new_doctor;
  }
}
