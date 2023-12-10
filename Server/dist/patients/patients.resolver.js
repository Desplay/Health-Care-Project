"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const patients_service_1 = require("./patients.service");
const patient_dto_1 = require("./datatype/patient.dto");
const common_1 = require("@nestjs/common");
const patients_pipe_1 = require("./patients.pipe");
let PatientsResolver = class PatientsResolver {
    constructor(patientsService) {
        this.patientsService = patientsService;
    }
    async createPatient(patientInput) {
        await this.patientsService.createPatient(patientInput);
        return 'Patient created!';
    }
    async getDetailsPatient(patientID) {
        console.log(patientID);
        const patientData = await this.patientsService.getPatientById(patientID);
        if (!patientData)
            throw new common_1.ForbiddenException('Patient not found!');
        const patientReturn = new patients_pipe_1.PatientEntitytoDTO().transform(patientData);
        return patientReturn;
    }
    async editPatient(patientID, patientInput) {
        const patientFound = await this.patientsService.getPatientById(patientID);
        if (!patientFound)
            throw new common_1.ForbiddenException('Patient not found!');
        await this.patientsService.editPatient(patientID, patientInput);
        return 'Patient edited!';
    }
    async getTenPatientsHighestRisk() {
        const patientsData = await this.patientsService.getTenPatientsHighestRisk();
        if (patientsData.length === 0)
            throw new common_1.ForbiddenException('No patients found!');
        const patientsReturn = patientsData.map((patient) => {
            return new patients_pipe_1.PatientEntitytoDTO().transform(patient);
        });
        return patientsReturn;
    }
    async getAllPatients() {
        const patientsData = await this.patientsService.getAllPatients();
        if (patientsData.length === 0)
            throw new common_1.ForbiddenException('No patients found!');
        const patientsReturn = patientsData.map((patient) => {
            return new patients_pipe_1.PatientEntitytoDTO().transform(patient);
        });
        return patientsReturn;
    }
};
exports.PatientsResolver = PatientsResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)({ name: 'patientInput', type: () => patient_dto_1.PatientInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patient_dto_1.PatientInput]),
    __metadata("design:returntype", Promise)
], PatientsResolver.prototype, "createPatient", null);
__decorate([
    (0, graphql_1.Query)(() => patient_dto_1.PatientDTO),
    __param(0, (0, graphql_1.Args)({ name: 'patientID', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PatientsResolver.prototype, "getDetailsPatient", null);
__decorate([
    (0, graphql_1.Query)(() => String),
    __param(0, (0, graphql_1.Args)({ name: 'patientID', type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: 'patientInput', type: () => patient_dto_1.PatientInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, patient_dto_1.PatientInput]),
    __metadata("design:returntype", Promise)
], PatientsResolver.prototype, "editPatient", null);
__decorate([
    (0, graphql_1.Query)(() => [patient_dto_1.PatientDTO]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientsResolver.prototype, "getTenPatientsHighestRisk", null);
__decorate([
    (0, graphql_1.Query)(() => [patient_dto_1.PatientDTO]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientsResolver.prototype, "getAllPatients", null);
exports.PatientsResolver = PatientsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [patients_service_1.PatientsService])
], PatientsResolver);
//# sourceMappingURL=patients.resolver.js.map