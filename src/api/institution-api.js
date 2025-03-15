import Boom from "@hapi/boom";
import { InstitutionSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const institutionApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      try {
        const institutions = await db.institutionStore.getAllInstitutions();
        return institutions;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    async handler(request) {
      try {
        const institution = await db.institutionStore.getInstitutionById(request.params.id);
        if (!institution) {
          return Boom.notFound("No Institution with this id");
        }
        return institution;
      } catch (err) {
        return Boom.serverUnavailable("No Institution with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      try {
        const institution = request.payload;
        const newInstitution = await db.institutionStore.addInstitution(institution);
        if (newInstitution) {
          return h.response(newInstitution).code(201);
        }
        return Boom.badImplementation("error creating institution");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const institution = await db.institutionStore.getInstitutionById(request.params.id);
        if (!institution) {
          return Boom.notFound("No Institution with this id");
        }
        await db.institutionStore.deleteInstitutionById(institution._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Institution with this id");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      try {
        await db.institutionStore.deleteAllInstitutions();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};