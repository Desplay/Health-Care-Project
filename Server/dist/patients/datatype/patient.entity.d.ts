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
import { Document, Schema } from 'mongoose';
export declare class Patient {
    PatientID: string;
    PhyID: string;
    name: string;
    age: number;
    gender: string;
    disease: {
        type: Schema.Types.ObjectId;
        ref: 'Disease';
    } | string;
    message?: string;
    createdAt: Date;
    nowOn: string;
}
export interface PatientEntity extends Patient, Document {
}
export declare const PatientSchema: Schema<PatientEntity, import("mongoose").Model<PatientEntity, any, any, any, Document<unknown, any, PatientEntity> & PatientEntity & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PatientEntity, Document<unknown, {}, PatientEntity> & PatientEntity & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const PatientModel: import("mongoose").Model<PatientEntity, {}, {}, {}, Document<unknown, {}, PatientEntity> & PatientEntity & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
