import { object, string, number, boolean } from "yup";

export const agentSchema = object()
  .shape({
    name: string().required("Name is required on body request").max(158, "Length must be under 158"),
    email: string()
      .email("E-mail format invalid")
      .required("E-mail is required on body request")
      .max(158, "Length must be under 158"),
    password: string()
      .required("Password is required on body request")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
        "Password must contain at least 8 characters, 1 capital letter, 1 lower case, 1 number and 1 special character"
      ),
  })
  .noUnknown(true);

export const updateAgentSchema = object()
  .shape({
    name: string().max(158, "Length must be under 158"),
    email: string().email("E-mail format invalid").max(158, "Length must be under 158"),
    password: string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
      "Password must contain at least 8 characters, 1 capital letter, 1 lower case, 1 number and 1 special character"
    ),
  })
  .noUnknown(true);

export const addressSchema = object()
  .shape({
    state: string()
      .required("State is required on body request")
      .min(2, "State must contain 2 characters")
      .max(2, "State must contain only 2 characters"),
    city: string().required("city is required on body request"),
    cep: string()
      .required("Cep is required on body request")
      .min(8, "Cep must contain 8 characters")
      .max(8, "Cep must contain 8 characters"),
    number: string().required("Number is required on request body"),
    street: string().required("Street is required on body request").max(158, "Length must be under 158"),
  })
  .noUnknown(true);

export const updateAddressSchema = object()
  .shape({
    state: string().min(2, "State must contain 2 characters").max(2, "State must contain only 2 characters"),
    city: string(),
    cep: string().min(8, "Cep must contain 8 characters").max(8, "Cep must contain 8 characters"),
    number: number(),
    street: string().max(158, "Length must be under 158"),
  })
  .noUnknown(true);

export const familySchema = object()
  .shape({
    name: string().required("Name is required on body request"),
    address_id: string().required("Address_id is required on body request"),
  })
  .noUnknown(true);

export const updateFamilySchema = object()
  .shape({
    name: string(),
    address_id: string(),
  })
  .noUnknown(true);

export const pacientSchema = object()
  .shape({
    cpf: string().required("Cpf is required on body request"),
    name: string().required("Name is required on body request").max(158, "Length must be under 158"),
    last_name: string().required("Last_name is required on body request"),
    age: string().required("Age is required on body request"),
    tel: string().required("Tel is required on body request"),
    family_id: string().required("Family_id is required on body request"),
    is_owner: boolean().required("Is_owner is required on body request"),
  })
  .noUnknown(true);

export const updatePacientSchema = object()
  .shape({
    cpf: string(),
    name: string().max(158, "Length must be under 158"),
    last_name: string(),
    age: string(),
    tel: string(),
    family_id: string(),
    is_owner: boolean(),
  })
  .unknown(false);

export const visitsSchema = object()
  .shape({
    status: string().required("Status is required on body request"),
    message: string().required("Message is required on body request").max(500, "Length must be under 500"),
    address_id: string().required("Address_id is required on body request"),
  })
  .noUnknown(true);

export const updateVisitsSchema = object()
  .shape({
    status: string(),
    message: string().max(500, "Length must be under 500"),
    address_id: string(),
  })
  .noUnknown(true);
