import { Module } from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DiseaseSchema } from './datatype/disease.entity';
import { DiseasesResolver } from './diseases.resolver';
import { DiseasesPipe } from './diseases.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Disease', schema: DiseaseSchema }]),
  ],
  providers: [DiseasesService, DiseasesResolver, DiseasesPipe],
  exports: [DiseasesService],
})
export class DiseasesModule {}
