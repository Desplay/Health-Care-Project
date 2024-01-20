import { Module, forwardRef } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsResolver } from './doctors.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorSchema } from './datatype/doctor.entity';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorPipe } from './doctors.pipe';
import { DiseasesModule } from 'src/diseases/diseases.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Doctor', schema: DoctorSchema }]),
    DiseasesModule,
    forwardRef(() => PatientsModule),
  ],
  providers: [DoctorsService, DoctorsResolver, DoctorPipe],
  exports: [DoctorsService, DoctorPipe],
})
export class DoctorsModule {}
