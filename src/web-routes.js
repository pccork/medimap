import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { institutionController } from "./controllers/institution-controller.js";

  
export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addinstitution", config: dashboardController.addInstitution },
  { method: "GET", path: "/dashboard/deleteinstitution/{id}", config: dashboardController.deleteInstitution },
 
  { method: "GET", path: "/institution/{id}", config: institutionController.index },
  { method: "POST", path: "/institution/{id}/adddepartment", config: institutionController.addDepartment }, 
  { method: "GET", path: "/institution/{id}/deletedepartment/{departmentid}", config: institutionController.deleteDepartment }

];
