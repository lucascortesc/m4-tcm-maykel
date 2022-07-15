"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("./data-source"));
const app_1 = __importDefault(require("./app"));
const InitConnection = async () => {
    const PORT = process.env.PORT || 3333;
    await data_source_1.default.initialize()
        .then(() => {
        console.log(`CONNECTION STABLISHED WITH DATABASE`);
    })
        .catch((error) => {
        console.log(error);
    });
    app_1.default.listen(process.env.PORT || 3000, () => {
        console.log(`Application running on port: ${PORT}`);
    });
};
InitConnection();
//# sourceMappingURL=server.js.map