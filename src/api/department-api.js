import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, DepartmentSpec, DepartmentSpecPlus, DepartmentArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js"


export const departmentApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const departments = await db.departmentStore.getAllDepartments();
        return departments;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: DepartmentArraySpec, failAction: validationError },
    description: "Get all departmentApi",
    notes: "Returns all departmentApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const department = await db.departmentStore.getDepartmentById(request.params.id);
        if (!department) {
          return Boom.notFound("No department with this id");
        }
        return department;
      } catch (err) {
        return Boom.serverUnavailable("No department with this id");
      }
    },
    tags: ["api"],
    description: "Find a Department",
    notes: "Returns a department",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: DepartmentSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const department = await db.departmentStore.addDepartment(request.params.id, request.payload);
        if (department) {
          return h.response(department).code(201);
        }
        return Boom.badImplementation("error creating department");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a department",
    notes: "Returns the newly created department",
    validate: { payload: DepartmentSpec },
    response: { schema: DepartmentSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.departmentStore.deleteAllDepartments();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all departmentApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const department = await db.departmentStore.getDepartmentById(request.params.id);
        if (!department) {
          return Boom.notFound("No Department with this id");
        }
        await db.departmentStore.deleteDepartment(department._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Department with this id");
      }
    },
    tags: ["api"],
    description: "Delete a department",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
