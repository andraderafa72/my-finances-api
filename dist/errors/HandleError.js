"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = void 0;
function HandleError(message, statusCode, status) {
    if (statusCode === void 0) { statusCode = 500; }
    if (status === void 0) { status = 'Erro'; }
    return {
        message: message,
        status: status,
        statusCode: statusCode,
    };
}
exports.HandleError = HandleError;
