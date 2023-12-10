import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { DiseasesService } from './diseases.service';
import { DiseaseDTO, DiseaseInput, Diseases } from './datatype/disease.dto';
import fs from 'fs';
import { Message } from 'src/utils/message';
import { ForbiddenException } from '@nestjs/common';

@Resolver()
export class DiseasesResolver {
  constructor(private readonly diseasesService: DiseasesService) {}

  @Query(() => Diseases)
  async getDiseases(): Promise<Diseases> {
    let diseases = await this.diseasesService.getDiseases();
    if (diseases.length === 0) {
      const status = (await this.addDefaultDiseases()).status;
      if (status === 204) diseases = await this.diseasesService.getDiseases();
    }
    if (diseases.length === 0)
      throw new ForbiddenException('No diseases added!');
    return { Diseases: diseases };
  }

  @Query(() => DiseaseDTO)
  async getDisease(
    @Args({ name: 'diseaseNameorID', type: () => String })
    diseaseNameorID: string,
  ): Promise<DiseaseDTO> {
    const diseaseData = await this.diseasesService.getDisease(diseaseNameorID);
    if (!diseaseData) throw new ForbiddenException('Disease not found!');
    return diseaseData;
  }

  @Mutation(() => String)
  async createDisease(
    @Args({ name: 'diseaseInput', type: () => DiseaseInput })
    disease: DiseaseInput,
  ): Promise<string> {
    await this.diseasesService.createDisease(disease);
    return 'Disease created!';
  }

  @Mutation(() => String)
  async createDefaultDiseases(): Promise<string> {
    const message = await this.addDefaultDiseases();
    return message.message;
  }

  private async addDefaultDiseases(): Promise<Message> {
    const defaultDiseases = await this.readDefaultDiseases();
    let flag = undefined;
    for (const disease of defaultDiseases) {
      if (!(await this.diseasesService.getDisease(disease.name))) {
        await this.diseasesService.createDisease(disease);
        flag = 1;
      }
    }
    let message: Message;
    if (!flag)
      message = {
        message: 'Default diseases already added!',
        status: 204,
      };
    else
      message = {
        message: 'Default diseases added!',
        status: 200,
        payload: defaultDiseases,
      };
    return message;
  }

  private async readDefaultDiseases(): Promise<any> {
    const rawdata = fs.readFileSync('src/utils/defaultDiseases.json');
    return JSON.parse(rawdata.toString());
  }
}
