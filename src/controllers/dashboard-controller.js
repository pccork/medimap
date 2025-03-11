import { db } from "../models/db.js";
import { InstitutionSpec } from "../models/joi-schemas.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const institutions = await db.institutionStore.getUserInstitutions(loggedInUser._id);
      const viewData = {
        title: "Medimap Dashboard",
        user: loggedInUser,
        institutions: institutions,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addInstitution: {
    validate: {
      payload: InstitutionSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Institution error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newInstitution = {
        userid: loggedInUser._id,
        title: request.payload.title,
        eircode: request.payload.eircode
      };
      await db.institutionStore.addInstitution(newInstitution);
      return h.redirect("/dashboard");
    },
  },
  deleteInstitution: {
    handler: async function (request, h) {
      const institution = await db.institutionStore.getInstitutionById(request.params.id);
      await db.institutionStore.deleteInstitutionById(institution._id);
      return h.redirect("/dashboard");
    },
  },





};

  