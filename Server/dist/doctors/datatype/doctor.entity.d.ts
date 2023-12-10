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
export declare class Doctor {
    PhyID: string;
    name: string;
    specialist: string;
    maxCapacity: number;
}
export interface DoctorEntity extends Doctor, Document {
}
export declare const DoctorSchema: Schema<DoctorEntity, import("mongoose").Model<DoctorEntity, any, any, any, Document<unknown, any, DoctorEntity> & DoctorEntity & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DoctorEntity, Document<unknown, {}, DoctorEntity> & DoctorEntity & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const DoctorModel: import("mongoose").Model<DoctorEntity, {}, {}, {}, Document<unknown, {}, DoctorEntity> & DoctorEntity & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
