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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const patients_pipe_1 = require("./patients.pipe");
const diseases_service_1 = require("../diseases/diseases.service");
const padZeros_1 = __importDefault(require("../utils/padZeros"));
let PatientsService = class PatientsService {
    constructor(patientModel, diseaseService) {
        this.patientModel = patientModel;
        this.diseaseService = diseaseService;
    }
    async createPatient(patient) {
        const patientTransformed = new patients_pipe_1.PatientInputtoEntity().transform(patient);
        const patientCount = await this.patientModel.count();
        const diseaseId = await this.diseaseService.throwDiseaseID(patient.diseaseID);
        patientTransformed.disease = diseaseId;
        patientTransformed.PhyID = `BN${(0, padZeros_1.default)(patientCount + 1)}`;
        patientTransformed.createdAt = new Date();
        patientTransformed.nowOn = 'Lobby';
        const newPatient = new this.patientModel(patientTransformed);
        return await newPatient.save();
    }
    async getPatientById(id) {
        return await this.patientModel.findById(id);
    }
    async editPatient(id, patient) {
        const patientTransformed = new patients_pipe_1.PatientInputtoEntity().transform(patient);
        const diseaseId = await this.diseaseService.throwDiseaseID(patient.diseaseID);
        patientTransformed.disease = diseaseId;
        const _id = await this.throwPatientIDdbyPhyID(id);
        return await this.patientModel.findByIdAndUpdate(_id, patientTransformed);
    }
    async getTenPatientsHighestRisk() {
        const data = await this.patientModel.aggregate([
            {
                $lookup: {
                    from: 'diseases',
                    localField: 'disease',
                    foreignField: '_id',
                    as: 'disease',
                },
            },
        ]);
        data.sort((a, b) => {
            return a.disease[0].prioritized - b.disease[0].prioritized;
        });
        data.map((patient) => {
            patient.disease[0] = patient.disease[0]._id;
            patient.disease = patient.disease[0];
        });
        return data;
    }
    async getAllPatients() {
        return await this.patientModel.find();
    }
    async throwPatientIDdbyPhyID(patientID) {
        return (await this.patientModel.findOne({ PhyID: patientID }))._id;
    }
};
exports.PatientsService = PatientsService;
exports.PatientsService = PatientsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Patient')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        diseases_service_1.DiseasesService])
], PatientsService);
//# sourceMappingURL=patients.service.js.map