"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModel = exports.PatientSchema = exports.Patient = void 0;
const mongoose_1 = require("mongoose");
class Patient {
}
exports.Patient = Patient;
exports.PatientSchema = new mongoose_1.Schema({
    PhyID: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    disease: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Disease',
        required: true,
    },
    message: { type: String, nullable: true, default: '' },
    createdAt: { type: Date, default: Date.now },
    nowOn: { type: String, default: 'Lobby' },
});
exports.PatientModel = (0, mongoose_1.model)('Patient', exports.PatientSchema);
//# sourceMappingURL=patient.entity.js.map