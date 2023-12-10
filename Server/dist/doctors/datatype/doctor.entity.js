"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorModel = exports.DoctorSchema = exports.Doctor = void 0;
const mongoose_1 = require("mongoose");
class Doctor {
}
exports.Doctor = Doctor;
exports.DoctorSchema = new mongoose_1.Schema({
    PhyID: { type: String, required: true },
    name: { type: String, required: true },
    specialist: { type: String, required: true },
    maxCapacity: { type: Number, required: true },
});
exports.DoctorModel = (0, mongoose_1.model)('Doctor', exports.DoctorSchema);
//# sourceMappingURL=doctor.entity.js.map