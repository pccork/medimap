import { DepartmentSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const institutionController = {
  index: {
    handler: async function (request, h) {
      const institution = await db.institutionStore.getInstitutionById(request.params.id);
      const viewData = {
        title: "Institution",
        eircode: "eircode",
        institution: institution       
      };
      return h.view("institution-view", viewData);
    },
  },

  addDepartment: {
    validate: {
      payload: DepartmentSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("institution-view", { title: "Add department error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const institution = await db.institutionStore.getInstitutionById(request.params.id);
      const newDepartment = {
        title: request.payload.title,
        email: request.payload.email,
        contact: Number(request.payload.contact),
      };
      await db.institutionStore.addDepartment(institution._id, newDepartment);
      return h.redirect(`/institution/${institution._id}`);
    },
  },
  
  deleteDepartment: {
    handler: async function(request, h) {
      const institution = await db.institutionStore.getInstitutionById(request.params.id);
      await db.institutionStore.deleteDepartment(request.params.trackid);
      return h.redirect(`/institution/${institution._id}`);
    },
  },


};
