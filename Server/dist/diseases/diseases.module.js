"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiseasesModule = void 0;
const common_1 = require("@nestjs/common");
const diseases_service_1 = require("./diseases.service");
const mongoose_1 = require("@nestjs/mongoose");
const disease_entity_1 = require("./datatype/disease.entity");
const diseases_resolver_1 = require("./diseases.resolver");
const diseases_pipe_1 = require("./diseases.pipe");
let DiseasesModule = class DiseasesModule {
};
exports.DiseasesModule = DiseasesModule;
exports.DiseasesModule = DiseasesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Disease', schema: disease_entity_1.DiseaseSchema }]),
        ],
        providers: [diseases_service_1.DiseasesService, diseases_resolver_1.DiseasesResolver, diseases_pipe_1.DiseasesPipe],
        exports: [diseases_service_1.DiseasesService],
    })
], DiseasesModule);
//# sourceMappingURL=diseases.module.js.map