import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };
  
  export const DepartmentSpec = {
    title: Joi.string().required(),
    email: Joi.string().required(),
    contact: Joi.number().allow("").optional(),
  };
  
  export const InstitutionSpec = {
    title: Joi.string().required(),
    eircode: Joi.string().required(),
  };