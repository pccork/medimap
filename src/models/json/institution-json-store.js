import { v4 } from "uuid";
import { db } from "./store-utils.js";
import { departmentJsonStore } from "./department-json-store.js";

export const institutionJsonStore = {
  async getAllInstitutions() {
    await db.read();
    return db.data.institutions;
  },

  async addInstitution(institution) {
    await db.read();
    institution._id = v4();
    db.data.institutions.push(institution);
    await db.write();
    return institution;
  },

  /* changed in lab 5
  async getInstitutionById(id) {
    await db.read();
    const list = db.data.institutions.find((institution) => institution._id === id);
    list.departments = await departmentJsonStore.getDepartmentsByInstitutionId(list._id);
    return list;
  },
  */

  async getInstitutionById(id) {
    await db.read();
    let list = db.data.institutions.find((institution) => institution._id === id);
    if (list) {
      list.departments = await departmentJsonStore.getDepartmentsByInstitutionId(list._id);
    } else {
      list = null;
    }
    return list;
  },


  async getUserInstitutions(userid) {
    await db.read();
    return db.data.institutions.filter((institution) => institution.userid === userid);
  },

  // changed in Lab5
   async deleteInstitutionById(id) {
    await db.read();
    // Searches for the institution that matches the given id inside db.data.institutions
    const index = db.data.institutions.findIndex((institution) => institution._id === id);
    // If found, index will be the position of the institution in the array; if not found index with be -1 
    if (index !== -1) db.data.institutions.splice(index, 1); // it is removed from the array using .splice(index, 1), which deletes one element at position index.
    await db.write(); // Saves the updated data back to the database
  },



  async deleteAllInstitutions() {
    db.data.institutions = [];
    await db.write();
  },
};
