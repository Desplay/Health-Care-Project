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
exports.DiseasesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const diseases_service_1 = require("./diseases.service");
const disease_dto_1 = require("./datatype/disease.dto");
const fs_1 = __importDefault(require("fs"));
const common_1 = require("@nestjs/common");
let DiseasesResolver = class DiseasesResolver {
    constructor(diseasesService) {
        this.diseasesService = diseasesService;
    }
    async getDiseases() {
        let diseases = await this.diseasesService.getDiseases();
        if (diseases.length === 0) {
            const status = (await this.addDefaultDiseases()).status;
            if (status === 204)
                diseases = await this.diseasesService.getDiseases();
        }
        if (diseases.length === 0)
            throw new common_1.ForbiddenException('No diseases added!');
        return { Diseases: diseases };
    }
    async getDisease(diseaseNameorID) {
        const diseaseData = await this.diseasesService.getDisease(diseaseNameorID);
        if (!diseaseData)
            throw new common_1.ForbiddenException('Disease not found!');
        return diseaseData;
    }
    async createDisease(disease) {
        await this.diseasesService.createDisease(disease);
        return 'Disease created!';
    }
    async createDefaultDiseases() {
        const message = await this.addDefaultDiseases();
        return message.message;
    }
    async addDefaultDiseases() {
        const defaultDiseases = await this.readDefaultDiseases();
        let flag = undefined;
        for (const disease of defaultDiseases) {
            if (!(await this.diseasesService.getDisease(disease.name))) {
                await this.diseasesService.createDisease(disease);
                flag = 1;
            }
        }
        let message;
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
    async readDefaultDiseases() {
        const rawdata = fs_1.default.readFileSync('src/utils/defaultDiseases.json');
        return JSON.parse(rawdata.toString());
    }
};
exports.DiseasesResolver = DiseasesResolver;
__decorate([
    (0, graphql_1.Query)(() => disease_dto_1.Diseases),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiseasesResolver.prototype, "getDiseases", null);
__decorate([
    (0, graphql_1.Query)(() => disease_dto_1.DiseaseDTO),
    __param(0, (0, graphql_1.Args)({ name: 'diseaseNameorID', type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiseasesResolver.prototype, "getDisease", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)({ name: 'diseaseInput', type: () => disease_dto_1.DiseaseInput })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [disease_dto_1.DiseaseInput]),
    __metadata("design:returntype", Promise)
], DiseasesResolver.prototype, "createDisease", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DiseasesResolver.prototype, "createDefaultDiseases", null);
exports.DiseasesResolver = DiseasesResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [diseases_service_1.DiseasesService])
], DiseasesResolver);
//# sourceMappingURL=diseases.resolver.js.map