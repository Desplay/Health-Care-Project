"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientPipe = exports.PatientEntitytoDTO = exports.PatientInputtoEntity = void 0;
const common_1 = require("@nestjs/common");
let PatientInputtoEntity = class PatientInputtoEntity {
    transform(value) {
        const newValue = {
            PatientID: null,
            PhyID: null,
            name: value.name,
            age: value.age,
            gender: value.gender,
            disease: null,
            message: value.message ? value.message : '',
            createdAt: null,
            nowOn: null,
        };
        return newValue;
    }
};
exports.PatientInputtoEntity = PatientInputtoEntity;
exports.PatientInputtoEntity = PatientInputtoEntity = __decorate([
    (0, common_1.Injectable)()
], PatientInputtoEntity);
let PatientEntitytoDTO = class PatientEntitytoDTO {
    transform(value) {
        const newValue = {
            patientID: value.PatientID,
            PhyID: value.PhyID,
            name: value.name,
            age: value.age,
            gender: value.gender,
            diseaseID: value.disease.toString(),
            message: value.message,
        };
        return newValue;
    }
};
exports.PatientEntitytoDTO = PatientEntitytoDTO;
exports.PatientEntitytoDTO = PatientEntitytoDTO = __decorate([
    (0, common_1.Injectable)()
], PatientEntitytoDTO);
class PatientPipe {
}
exports.PatientPipe = PatientPipe;
//# sourceMappingURL=patients.pipe.js.map