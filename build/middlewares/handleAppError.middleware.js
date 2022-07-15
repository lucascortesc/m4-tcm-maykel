"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAppErrorMiddleware = void 0;
const appError_1 = require("../errors/appError");
const handleAppErrorMiddleware = (error, req, res, _) => {
    if (error instanceof appError_1.AppError) {
        return res.status(error.statusCode).json({
            error: error.message,
        });
    }
    if (error instanceof Error) {
        return res.status(400).json({
            error: error.message,
        });
    }
    return res.status(500).json({
        error: "Internal server error",
    });
};
exports.handleAppErrorMiddleware = handleAppErrorMiddleware;
//# sourceMappingURL=handleAppError.middleware.js.map