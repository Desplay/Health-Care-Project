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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiseaseInput = exports.Diseases = exports.DiseaseDTO = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let DiseaseDTO = class DiseaseDTO {
};
exports.DiseaseDTO = DiseaseDTO;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DiseaseDTO.prototype, "diseaseID", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DiseaseDTO.prototype, "diseaseName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], DiseaseDTO.prototype, "diseaseDescription", void 0);
exports.DiseaseDTO = DiseaseDTO = __decorate([
    (0, graphql_1.ObjectType)()
], DiseaseDTO);
let Diseases = class Diseases {
};
exports.Diseases = Diseases;
__decorate([
    (0, graphql_1.Field)(() => [DiseaseDTO]),
    __metadata("design:type", Array)
], Diseases.prototype, "Diseases", void 0);
exports.Diseases = Diseases = __decorate([
    (0, graphql_1.ObjectType)()
], Diseases);
let DiseaseInput = class DiseaseInput {
};
exports.DiseaseInput = DiseaseInput;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DiseaseInput.prototype, "diseaseName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], DiseaseInput.prototype, "specialist", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], DiseaseInput.prototype, "prioritized", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], DiseaseInput.prototype, "diseaseDescription", void 0);
exports.DiseaseInput = DiseaseInput = __decorate([
    (0, graphql_1.InputType)()
], DiseaseInput);
//# sourceMappingURL=disease.dto.js.map