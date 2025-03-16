import axios from "axios";
import { serviceUrl } from "../fixtures.js";

// service act as a gateway to API using axios to create dispatch/ accept HTTP requests just like postman
export const medimapService = {
  medimapUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.medimapUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.medimapUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    const res = await axios.get(`${this.medimapUrl}/api/users`);
    return res.data;
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.medimapUrl}/api/users`);
    return res.data;
  },

  async createInstitution(institution) {
    const res = await axios.post(`${this.medimapUrl}/api/institutions`, institution);
    return res.data;
  },

  async deleteAllInstitutions() {
    const response = await axios.delete(`${this.medimapUrl}/api/institutions`);
    return response.data;
  },

  async deleteInstitution(id) {
    const response = await axios.delete(`${this.medimapUrl}/api/institutions/${id}`);
    return response;
  },

  async getAllInstitutions() {
    const res = await axios.get(`${this.medimapUrl}/api/institutions`);
    return res.data;
  },

  async getInstitution(id) {
    const res = await axios.get(`${this.medimapUrl}/api/institutions/${id}`);
    return res.data;
  },

  async getAllDepartments() {
    const res = await axios.get(`${this.medimapUrl}/api/departments`);
    return res.data;
  },

  async createDepartment(id, department) {
    const res = await axios.post(`${this.medimapUrl}/api/institutions/${id}/departments`, department);
    return res.data;
  },

  async deleteAllDepartments() {
    const res = await axios.delete(`${this.medimapUrl}/api/departments`);
    return res.data;
  },

  async getDepartment(id) {
    const res = await axios.get(`${this.medimapUrl}/api/departments/${id}`);
    return res.data;
  },

  async deleteDepartment(id) {
    const res = await axios.delete(`${this.medimapUrl}/api/departments/${id}`);
    return res.data;
  },
};