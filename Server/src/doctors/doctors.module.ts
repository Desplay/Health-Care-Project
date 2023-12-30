import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsResolver } from './doctors.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorSchema } from './datatype/doctor.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Doctor', schema: DoctorSchema }]),
  ],
  providers: [DoctorsService, DoctorsResolver],
})
export class DoctorsModule {}
