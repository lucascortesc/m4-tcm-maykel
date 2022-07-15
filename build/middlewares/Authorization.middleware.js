"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const appError_1 = require("../errors/appError");
const authorization = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        throw new appError_1.AppError("Missing token", 401);
    }
    const splitToken = token.split(" ");
    jsonwebtoken_1.default.verify(splitToken[1], process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            throw new appError_1.AppError("Invalid token", 401);
        }
        if (!decoded.isactive) {
            throw new appError_1.AppError("User inactive");
        }
        req.userId = decoded.id;
        req.userIsActive = decoded.isactive;
    });
    next();
};
exports.authorization = authorization;
//# sourceMappingURL=Authorization.middleware.js.map