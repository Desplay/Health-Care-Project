import { Query, Resolver, Mutation } from '@nestjs/graphql';
import { DiseasesService } from './diseases.service';
import { Diseases } from './datatype/disease.dto';
import fs from 'fs';

@Resolver()
export class DiseasesResolver {
  constructor(private readonly diseasesService: DiseasesService) {}

  @Query(() => Diseases)
  async getDiseases(): Promise<Diseases> {
    const diseases = await this.diseasesService.getDiseases();
    return { Diseases: diseases };
  }

  @Mutation(() => String)
  async addDefaultDiseases(): Promise<string> {
    const rawdata = fs.readFileSync('src/utils/defaultDiseases.json');
    const defaultDiseases = JSON.parse(rawdata.toString());
    for (const disease of defaultDiseases) {
      await this.diseasesService.createDisease(disease);
    }
    return 'Default diseases added!';
  }
}
