import { Institution } from "./institution.js";
import { departmentMongoStore } from "./department-mongo-store.js";

export const institutionMongoStore = {
  async getAllInstitutions() {
    const institutions = await Institution.find().lean();
    return institutions;
  },
  

  async getInstitutionById(id) {
    if (id) {
      const institution = await Institution.findOne({ _id: id }).lean();
      if (institution) {
        institution.departments = await departmentMongoStore.getDepartmentsByInstitutionId(institution._id);
      }
      return institution;
    }
    return null;
  },

  async addInstitution(institution) {
    const newInstitution = new Institution(institution);
    const institutionObj = await newInstitution.save();
    return this.getInstitutionById(institutionObj._id);
  },

  async getUserInstitutions(id) {
    const institution = await Institution.find({ userid: id }).lean();
    return institution;
  },

  async deleteInstitutionById(id) {
    try {
      await Institution.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllInstitutions() {
    await Institution.deleteMany({});
  },

  async updateInstitution(institution, updatedInstitution) {
    const institutionDoc = await Institution.findOne({ _id: institution._id });
    institutionDoc.title = updatedInstitution.title;
    institutionDoc.eircode = updatedInstitution.eircode;
    await institutionDoc.save();
  }




};
