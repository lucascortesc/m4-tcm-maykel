"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidation = void 0;
const yup_1 = require("yup");
const schemaValidation = (schema) => async (req, res, next) => {
    try {
        const validation = await schema.validate(req.body);
        req.body = validation;
        next();
    }
    catch (error) {
        if (error instanceof yup_1.ValidationError) {
            return res.status(400).json({
                message: error.errors.join("; "),
            });
        }
    }
};
exports.schemaValidation = schemaValidation;
//# sourceMappingURL=schemaValidation.middleware.js.map