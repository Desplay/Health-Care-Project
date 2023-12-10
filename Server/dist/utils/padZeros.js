"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(inputNumber) {
    switch (inputNumber.toString().length) {
        case 1:
            return `000${inputNumber}`;
        case 2:
            return `00${inputNumber}`;
        case 3:
            return `0${inputNumber}`;
        default:
            return `${inputNumber}`;
    }
}
exports.default = default_1;
//# sourceMappingURL=padZeros.js.map