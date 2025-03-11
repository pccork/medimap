// import { userMemStore } from "./mem/user-mem-store.js";
// import { institutionMemStore } from "./mem/institution-mem-store.js";
// import { departmentMemStore } from "./mem/department-mem-store.js";

import { userMemStore } from "./mem/user-mem-store.js";
import { institutionMemStore } from "./mem/institution-mem-store.js";
import { departmentMemStore } from "./mem/department-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { institutionJsonStore } from "./json/institution-json-store.js";
import { departmentJsonStore } from "./json/department-json-store.js";
import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { institutionMongoStore } from "./mongo/institution-mongo-store.js";
import { departmentMongoStore } from "./mongo/department-mongo-store.js";

export const db = {
  userStore: null,
  institutionStore: null,
  departmentStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.institutionStore = institutionJsonStore;
        this.departmentStore = departmentJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.institutionStore = institutionMongoStore;
        this.departmentStore = departmentMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.institutionStore = institutionMemStore;
        this.departmentStore = departmentMemStore;
    }
  },
};




