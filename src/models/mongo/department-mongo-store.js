import { Department } from "./department.js";
import { Institution } from "./institution.js";


export const departmentMongoStore = {
  async getAllDepartments() {
    const departments = await Department.find().lean();
    return departments;
  },

  async addDepartment(institutionId, department) {
    department.institutionid = institutionId;
    const newDepartment = new Department(department);
    const departmentObj = await newDepartment.save();
    return this.getDepartmentById(departmentObj._id);
  },

  async getDepartmentsByInstitutionId(id) {
    const departments = await Department.find({ institutionid: id }).lean();
    return departments;
  },

  async getDepartmentById(id) {
    if (id) {
      const department = await Department.findOne({ _id: id }).lean();
      return department;
    }
    return null;
  },

  async deleteDepartment(id) {
    try {
      await Department.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllDepartments() {
    await Department.deleteMany({});
  },

  async updateDepartment(department, updatedDepartment) {
    const departmentDoc = await Department.findOne({ _id: department._id });
    departmentDoc.title = updatedDepartment.title;
    departmentDoc.email = updatedDepartment.email;
    departmentDoc.contact = updatedDepartment.contact;
    await departmentDoc.save();
  },
};

