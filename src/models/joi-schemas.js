import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");


export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("maggie@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("maggie").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

  
export const DepartmentSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("renal"),
    email: Joi.string().required().example("cuh@hse.ie"),
    contact: Joi.number().allow("").optional().example(45678),
    date: Joi.date().required().example("2025-03-19"),
    institutionid: IdSpec,
  })
  .label("Department");

export const DepartmentSpecPlus = DepartmentSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("DepartmentPlus");

export const DepartmentArraySpec = Joi.array().items(DepartmentSpecPlus).label("DepartmentArray");
  
export const InstitutionSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("cuh"),
    eircode: Joi.string().required().example("T12WE28"),
    userid: IdSpec,
    departments: DepartmentArraySpec,
}).label("Institution");

export const InstitutionSpecPlus = InstitutionSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("InstitutionPlus");

export const InstitutionArraySpec = Joi.array().items(InstitutionSpecPlus).label("InstitutionArray");