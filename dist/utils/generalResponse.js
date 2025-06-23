"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generalResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
exports.default = generalResponse;
