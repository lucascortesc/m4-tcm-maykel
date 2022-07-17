import { object, string } from "yup";

export const agentSchema = object().shape({
  name: string().required("name is required on body request").max(158, "length must be under 158"),
  email: string()
    .email("e-mail format invalid")
    .required("e-mail is required on body request")
    .max(158, "length must be under 158"),
  password: string()
    .required("password is required on body request")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
      "password must contain at least 8 characters, 1 capital letter, 1 lower case, 1 number and 1 special character"
    ),
});

export const addressSchema = object().shape({
  state: string()
    .required("state is required on body request")
    .min(2, "state must contain 2 characters")
    .max(2, "state must contain only 2 characters"),
  city: string().required("city is required on body request"),
  cep: string()
    .required("cep is required on body request")
    .min(8, "cep must contain 8 characters")
    .max(8, "cep must contain 8 characters"),
  number: string().required("number is required on request body"),
  street: string().required("street is required on body request").max(158, "length must be under 158"),
});

export const familySchema = object().shape({
  name: string().required("name is required on request body"),
  address_id: string().required("address_id is required on request body"),
});

export const pacientSchema = object().shape({
  cpf: string().required("cpf is required on request body"),
  name: string().required("name is required on request body").max(158, "legnth must be under 158"),
  last_name: string().required("last_name is required on request body"),
  age: string().required("age is required on request body"),
  tel: string().required("tel is required on request body"),
  family_id: string().required("family_id is required on request body"),
});

export const visitsSchema = object().shape({
  status: string().required("status is required on request body"),
  message: string().required("message is required on request body").max(500, "length must be under 500"),
  address_id: string().required("address_id is required on request body"),
});

export const updateAgentSchema = object().shape({
  name: string().max(158, "length must be under 158"),
  email: string().email("e-mail format invalid").max(158, "length must be under 158"),
  password: string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
    "password must contain at least 8 characters, 1 capital letter, 1 lower case, 1 number and 1 special character"
  ),
});
