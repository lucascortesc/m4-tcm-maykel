"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const healthAgent_entity_1 = require("../../entities/healthAgent.entity");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const appError_1 = require("../../errors/appError");
require("dotenv/config");
const loginHealthAgentService = async (email, password) => {
    const healthAgentRepository = data_source_1.default.getRepository(healthAgent_entity_1.Agent);
    const agents = await healthAgentRepository.findOneBy({ email: email });
    if (!agents) {
        throw new appError_1.AppError("Invalid credentials.");
    }
    const passwordMatch = bcrypt.compareSync(password, agents.password);
    if (!passwordMatch) {
        throw new appError_1.AppError("Invalid credentials.");
    }
    const token = jsonwebtoken_1.default.sign({ isactive: agents.isactive, id: agents.id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    });
    return token;
};
exports.default = loginHealthAgentService;
//# sourceMappingURL=loginHealthAgent.service.js.map