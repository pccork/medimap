import { v4 } from "uuid";

let departments = [];

export const departmentMemStore = {
  async getAllDepartments() {
    return departments;
  },

  async addDepartment(institutionId, department) {
    department._id = v4();
    department.institutionid = institutionId;
    departments.push(department);
    return department;
  },

  /* updayed lab5
  async getDepartmentsByInstitutionId(id) {
    return departments.filter((department) => department.institutionid === id);
  },

  async getDepartmentById(id) {
    return departments.find((department) => department._id === id);
  },

  async getInstitutionDepartments(institutionId) {
    return departments.filter((department) => department.institutionid === institutionId);
  },

  async deleteDepartment(id) {
    const index = departments.findIndex((department) => department._id === id);
    departments.splice(index, 1);
  },

  async deleteAllDepartments() {
    departments = [];
  },
  */

  async getDepartmentById(id) {
    let foundDepartment = departments.find((department) => department._id === id);
    if (!foundDepartment) {
      foundDepartment = null;
    }
    return foundDepartment;
  },

  async getInstitutionDepartments(institutionId) {
    let foundDepartments = departments.filter((department) => department.institutionid === institutionId);
    if (!foundDepartments) {
      foundDepartments = null;
    }
    return foundDepartments;
  },

  async deleteDepartment(id) {
    const index = departments.findIndex((department) => department._id === id);
    if (index !== -1) departments.splice(index, 1);
  },


  async updateDepartment(department, updatedDepartment) {
    department.title = updatedDepartment.title;
    department.email = updatedDepartment.email;
    department.contact = updatedDepartment.contact;
  },
};
