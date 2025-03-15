import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { DepartmentSpec } from "../models/joi-schemas.js";

export const departmentApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
        try {
            const departments = await db.departmentStore.getAllDepartments();
            return departments;
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }
    },
  },

  findOne: {
    auth: false,
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
  },

  create: {
    auth: false,
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
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
        try {
            await db.departmentStore.deleteAllDepartments();
            return h.response().code(204);
          } catch (err) {
            return Boom.serverUnavailable("Database Error");
          }

    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
        try {
            const track = await db.trackStore.getDepartmentById(request.params.id);
            if (!track) {
              return Boom.notFound("No Department with this id");
            }
            await db.trackStore.deleteDepartment(track._id);
            return h.response().code(204);
          } catch (err) {
            return Boom.serverUnavailable("No Department with this id");
          }
    },
  },
};