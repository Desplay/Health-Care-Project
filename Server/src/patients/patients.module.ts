import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsResolver } from './patients.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from './datatype/patient.entity';
import { PatientPipe } from './patients.pipe';
import { DiseasesModule } from 'src/diseases/diseases.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Patient', schema: PatientSchema }]),
    DiseasesModule,
  ],
  providers: [PatientsService, PatientsResolver, PatientPipe],
})
export class PatientsModule {}
