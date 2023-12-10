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
exports.DiseasesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const padZeros_1 = __importDefault(require("../utils/padZeros"));
const diseases_pipe_1 = require("./diseases.pipe");
let DiseasesService = class DiseasesService {
    constructor(diseaseModel) {
        this.diseaseModel = diseaseModel;
    }
    async createDisease(disease) {
        const diseaseTransformed = new diseases_pipe_1.DiseaseInputtoEntity().transform(disease);
        const diseaseCount = await this.diseaseModel.count();
        diseaseTransformed.diseaseID = `DN${(0, padZeros_1.default)(diseaseCount + 1)}`;
        const newDisease = new this.diseaseModel(diseaseTransformed);
        return await newDisease.save();
    }
    async getDisease(disease) {
        return await this.diseaseModel.findOne({
            $or: [{ diseaseID: disease }, { diseaseName: disease }, { _id: disease }],
        });
    }
    async getDiseaseById(Id) {
        return await this.diseaseModel.findById(Id);
    }
    async throwDiseaseID(diseaseID) {
        return (await this.diseaseModel.findOne({ diseaseID }))._id;
    }
    async getDiseases() {
        return await this.diseaseModel.find();
    }
};
exports.DiseasesService = DiseasesService;
exports.DiseasesService = DiseasesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Disease')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DiseasesService);
//# sourceMappingURL=diseases.service.js.map