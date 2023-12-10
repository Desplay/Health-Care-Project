"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiseasesPipe = exports.DiseaseInputtoEntity = exports.DiseaseEntitytoDTO = void 0;
const common_1 = require("@nestjs/common");
let DiseaseEntitytoDTO = class DiseaseEntitytoDTO {
    transform(value) {
        const { diseaseID, diseaseName, description } = value;
        return {
            diseaseID,
            diseaseName,
            diseaseDescription: description,
        };
    }
};
exports.DiseaseEntitytoDTO = DiseaseEntitytoDTO;
exports.DiseaseEntitytoDTO = DiseaseEntitytoDTO = __decorate([
    (0, common_1.Injectable)()
], DiseaseEntitytoDTO);
let DiseaseInputtoEntity = class DiseaseInputtoEntity {
    transform(value) {
        const { diseaseName, specialist, prioritized, diseaseDescription } = value;
        if (diseaseDescription === undefined) {
            return {
                diseaseID: null,
                diseaseName: diseaseName ? diseaseName : value.name,
                specialist,
                prioritized,
            };
        }
        return {
            diseaseID: null,
            diseaseName: diseaseName ? diseaseName : value.name,
            specialist,
            prioritized,
            description: diseaseDescription,
        };
    }
};
exports.DiseaseInputtoEntity = DiseaseInputtoEntity;
exports.DiseaseInputtoEntity = DiseaseInputtoEntity = __decorate([
    (0, common_1.Injectable)()
], DiseaseInputtoEntity);
class DiseasesPipe {
}
exports.DiseasesPipe = DiseasesPipe;
//# sourceMappingURL=diseases.pipe.js.map