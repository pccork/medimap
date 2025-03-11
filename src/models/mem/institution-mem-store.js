import { v4 } from "uuid";
import { departmentMemStore } from "./department-mem-store.js";

let institutions = [];

export const institutionMemStore = {
  async getAllInstitutions() {
    return institutions;
  },

  async addInstitution(institution) {
    institution._id = v4();
    institutions.push(institution);
    return institution;
  },

  async getInstitutionById(id) {
    const list = institutions.find((institution) => institution._id === id);
    list.departments = await departmentMemStore.getDepartmentsByInstitutionId(list._id);
    return list;
  },

  async getUserInstitutions(userid) {
    return institutions.filter((institution) => institution.userid === userid);
  },




  async deleteInstitutionById(id) {
    const index = institutions.findIndex((institution) => institution._id === id);
    institutions.splice(index, 1);
  },

  async deleteAllInstitutions() {
    institutions = [];
  },
};
