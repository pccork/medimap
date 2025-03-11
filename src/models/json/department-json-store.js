import { v4 } from "uuid";
import { db } from "./store-utils.js";

export const departmentJsonStore = {
  async getAllDepartments() {
    await db.read();
    return db.data.departments;
  },

  async addDepartment(institutionId, department) {
    await db.read();
    department._id = v4();
    department.institutionid = institutionId;
    db.data.departments.push(department);
    await db.write();
    return department;
  },

  /* updated lab 5
  async getDepartmentsByInstitutionId(id) {
    await db.read();
    return db.data.departments.filter((department) => department.institutionid === id);
  },

  async getDepartmentById(id) {
    await db.read();
    return db.data.departments.find((department) => department._id === id);
  },

  async deleteDepartment(id) {
    await db.read();
    const index = db.data.departments.findIndex((department) => department._id === id);
    db.data.departments.splice(index, 1);
    await db.write();
  },
  */
  async getDepartmentsByInstitutionId(id) {
    await db.read();
    let foundDepartments = db.data.departments.filter((department) => department.institutionid === id);
    if (!foundDepartments) {
      foundDepartments = null;
    }
    return foundDepartments;
  },

  async getDepartmentById(id) {
    await db.read();
    let foundDepartment = db.data.departments.find((department) => department._id === id);
    if (!foundDepartment) {
      foundDepartment = null;
    }
    return foundDepartment;
  },

  async getInstitutionDepartments(institutionId) {
    await db.read();
    let foundDepartments = departments.filter((department) => department.institutionid === institutionId);
    if (!foundDepartments) {
      foundDepartments = null;
    }
    return foundDepartments;
  },

  async deleteDepartment(id) {
    await db.read();
    const index = db.data.departments.findIndex((department) => department._id === id);
    if (index !== -1) db.data.departments.splice(index, 1);
    await db.write();
  },


  async deleteAllDepartments() {
    db.data.departments = [];
    await db.write();
  },

  async updateDepartment(department, updatedDepartment) {
    department.title = updatedDepartment.title;
    department.email = updatedDepartment.email;
    department.contact = updatedDepartment.contact;
    await db.write();
  },
};
