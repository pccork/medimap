import { userApi } from "./api/user-api.js";
import { institutionApi } from "./api/institution-api.js";
import { departmentApi } from "./api/department-api.js";


export const apiRoutes = [
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/institutions", config: institutionApi.create },
  { method: "DELETE", path: "/api/institutions", config: institutionApi.deleteAll },
  { method: "GET", path: "/api/institutions", config: institutionApi.find },
  { method: "GET", path: "/api/institutions/{id}", config: institutionApi.findOne },
  { method: "DELETE", path: "/api/institutions/{id}", config: institutionApi.deleteOne },

  { method: "GET", path: "/api/departments", config: departmentApi.find },
  { method: "GET", path: "/api/departments/{id}", config: departmentApi.findOne },
  { method: "POST", path: "/api/institutions/{id}/departments", config: departmentApi.create },
  { method: "DELETE", path: "/api/departments", config: departmentApi.deleteAll },
  { method: "DELETE", path: "/api/departments/{id}", config: departmentApi.deleteOne },
];