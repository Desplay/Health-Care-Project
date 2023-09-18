import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LobbyModule } from './lobby/lobby.module';
import { ReceptionModule } from './reception/reception.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';

@Module({
  imports: [LobbyModule, ReceptionModule, DoctorModule, PatientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
