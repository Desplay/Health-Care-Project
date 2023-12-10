export declare class DiseaseDTO {
    diseaseID: string;
    diseaseName: string;
    diseaseDescription?: string;
}
export declare class Diseases {
    Diseases: DiseaseDTO[];
}
export declare class DiseaseInput {
    diseaseName: string;
    specialist: string;
    prioritized: number;
    diseaseDescription?: string;
}
