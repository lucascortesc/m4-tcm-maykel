"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const handleAppError_middleware_1 = require("./middlewares/handleAppError.middleware");
const address_routes_1 = __importDefault(require("./routes/address.routes"));
const family_routes_1 = __importDefault(require("./routes/family.routes"));
const healthAgent_routes_1 = __importDefault(require("./routes/healthAgent.routes"));
const homeVisit_routes_1 = __importDefault(require("./routes/homeVisit.routes"));
const pacient_routes_1 = require("./routes/pacient.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("", healthAgent_routes_1.default);
app.use("/family", family_routes_1.default);
app.use("/address", address_routes_1.default);
app.use("/visits", homeVisit_routes_1.default);
app.use("/pacient", pacient_routes_1.pacientRoutes);
app.use(handleAppError_middleware_1.handleAppErrorMiddleware);
exports.default = app;
//# sourceMappingURL=app.js.map