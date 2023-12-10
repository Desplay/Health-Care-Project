"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientsModule = void 0;
const common_1 = require("@nestjs/common");
const patients_service_1 = require("./patients.service");
const patients_resolver_1 = require("./patients.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const patient_entity_1 = require("./datatype/patient.entity");
const patients_pipe_1 = require("./patients.pipe");
const diseases_module_1 = require("../diseases/diseases.module");
let PatientsModule = class PatientsModule {
};
exports.PatientsModule = PatientsModule;
exports.PatientsModule = PatientsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Patient', schema: patient_entity_1.PatientSchema }]),
            diseases_module_1.DiseasesModule,
        ],
        providers: [patients_service_1.PatientsService, patients_resolver_1.PatientsResolver, patients_pipe_1.PatientPipe],
    })
], PatientsModule);
//# sourceMappingURL=patients.module.js.map