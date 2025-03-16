import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required()
};

export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number()
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

  
export const DepartmentSpec = Joi.object()
.keys({
  title: Joi.string().required().example("Renal"),
  email: Joi.string().required().example("cuh@hse.ie"),
  contact: Joi.number().allow("").optional().example(456789),
  Institutionid: IdSpec,
})
.label("Department");

export const DepartmentSpecPlus = DepartmentSpec.keys({
_id: IdSpec,
__v: Joi.number(),
}).label("DepartmentPlus");

export const DepartmentArraySpec = Joi.array().items(DepartmentSpecPlus).label("DepartmentArray");
  
  export const InstitutionSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Renal Department"),
    userid: IdSpec,
    departments: DepartmentArraySpec,
  })
  .label("Institution");

export const InstitutionSpecPlus = InstitutionSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("InstitutionPlus");

export const InstitutionArraySpec = Joi.array().items(InstitutionSpecPlus).label("InstitutionArray");