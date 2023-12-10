/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema, Document } from 'mongoose';
export declare class Disease {
    diseaseID: string;
    diseaseName: string;
    prioritized: number;
    specialist: string;
    description?: string;
}
export interface DiseaseEntity extends Disease, Document {
}
export declare const DiseaseSchema: Schema<DiseaseEntity, import("mongoose").Model<DiseaseEntity, any, any, any, Document<unknown, any, DiseaseEntity> & DiseaseEntity & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DiseaseEntity, Document<unknown, {}, DiseaseEntity> & DiseaseEntity & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const DiseaseModel: import("mongoose").Model<DiseaseEntity, {}, {}, {}, Document<unknown, {}, DiseaseEntity> & DiseaseEntity & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
