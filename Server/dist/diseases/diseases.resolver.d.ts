import { DiseasesService } from './diseases.service';
import { DiseaseDTO, DiseaseInput, Diseases } from './datatype/disease.dto';
export declare class DiseasesResolver {
    private readonly diseasesService;
    constructor(diseasesService: DiseasesService);
    getDiseases(): Promise<Diseases>;
    getDisease(diseaseNameorID: string): Promise<DiseaseDTO>;
    createDisease(disease: DiseaseInput): Promise<string>;
    createDefaultDiseases(): Promise<string>;
    private addDefaultDiseases;
    private readDefaultDiseases;
}
