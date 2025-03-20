import { DepartmentSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";


export const departmentController = {
  index: {
    handler: async function (request, h) {
      const institution = await db.institutionStore.getInstitutionById(request.params.id);
      const department = await db.departmentStore.getDepartmentById(request.params.departmentid);
      const viewData = {
        title: "Edit Department",
        institution: institution,
        department: department,
      };
      return h.view("department-view", viewData);
    },
  },

  update: {
    validate: {
      payload: DepartmentSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("department-view", { title: "Edit department error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const department = await db.departmentStore.getDepartmentById(request.params.departmentid);
      const newDepartment = {
        title: request.payload.title,
        email: request.payload.email,
        contact: Number(request.payload.contact),
        date: new Date(request.payload.date),
                
      };
      await db.departmentStore.updateDepartment(department, newDepartment);
      return h.redirect(`/Institution/${request.params.id}`);
      
    

    },
  },
};