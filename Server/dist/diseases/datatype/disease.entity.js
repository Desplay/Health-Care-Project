"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiseaseModel = exports.DiseaseSchema = exports.Disease = void 0;
const mongoose_1 = require("mongoose");
class Disease {
}
exports.Disease = Disease;
exports.DiseaseSchema = new mongoose_1.Schema({
    diseaseID: { type: String, required: true },
    diseaseName: { type: String, required: true },
    prioritized: { type: Number, required: true },
    specialist: { type: String, required: true },
    description: { type: String, default: '' },
});
exports.DiseaseModel = (0, mongoose_1.model)('Disease', exports.DiseaseSchema);
//# sourceMappingURL=disease.entity.js.map