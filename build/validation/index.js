"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAgentSchema = exports.visitsSchema = exports.pacientSchema = exports.familySchema = exports.addressSchema = exports.agentSchema = void 0;
const yup_1 = require("yup");
exports.agentSchema = (0, yup_1.object)().shape({
    name: (0, yup_1.string)()
        .required("name is required on body request.")
        .max(158, "length must be under 158."),
    email: (0, yup_1.string)()
        .email("e-mail format invalid.")
        .required("e-mail is required on body request.")
        .max(158, "length must be under 158."),
    password: (0, yup_1.string)()
        .required("password is required on body request.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/, "password must contain at least 8 characters, 1 capital letter, 1 lower case, 1 number and 1 special character."),
});
exports.addressSchema = (0, yup_1.object)().shape({
    state: (0, yup_1.string)()
        .required("state is required on body request.")
        .min(2, "State must contain 2 characters.")
        .max(2, "State must contain only 2 characters."),
    city: (0, yup_1.string)().required("city is required on body request."),
    cep: (0, yup_1.string)()
        .required("cep is required on body request.")
        .min(8, "cep must contain 8 characters.")
        .max(8, "cep must contain 8 characters."),
    number: (0, yup_1.string)().required("number is required on request body."),
    street: (0, yup_1.string)()
        .required("street is required on body request.")
        .max(158, "length must be under 158."),
});
exports.familySchema = (0, yup_1.object)().shape({
    name: (0, yup_1.string)().required("name is required on request body."),
    address_id: (0, yup_1.string)().required("address_id is required on request body."),
});
exports.pacientSchema = (0, yup_1.object)().shape({
    cpf: (0, yup_1.string)().required("cpf is required on request body."),
    name: (0, yup_1.string)()
        .required("name is required on request body.")
        .max(158, "legnth must be under 158."),
    last_name: (0, yup_1.string)().required("last_name is required on request body"),
    age: (0, yup_1.string)().required("age is required on request body."),
    tel: (0, yup_1.string)().required("tel is required on request body."),
    family_id: (0, yup_1.string)().required("family_id is required on request body."),
});
exports.visitsSchema = (0, yup_1.object)().shape({
    status: (0, yup_1.string)().required("status is required on request body."),
    message: (0, yup_1.string)()
        .required("message is required on request body.")
        .max(500, "length must be under 500."),
    address_id: (0, yup_1.string)().required("address_id is required on request body."),
});
exports.updateAgentSchema = (0, yup_1.object)().shape({
    name: (0, yup_1.string)().max(158, "length must be under 158."),
    email: (0, yup_1.string)()
        .email("e-mail format invalid.")
        .max(158, "length must be under 158."),
    password: (0, yup_1.string)().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/, "password must contain at least 8 characters, 1 capital letter, 1 lower case, 1 number and 1 special character."),
});
//# sourceMappingURL=index.js.map