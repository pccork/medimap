import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import Joi from "joi";
import { webRoutes } from "./web-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { apiRoutes } from "./api-routes.js";


// to get current file name and directory name in ESModules
// Converts the fiel URL into a normal fiel system path 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}


async function init() {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });
  
  // enables templating in Hapi.js. 
  // allows the server to render HTML views using engines like Handlebars
  await server.register(Vision);
  // hapi-auth-cookie plugin, for session-based authentication
  //  not built-in required installed
  await server.register(Cookie);

  
  server.validator(Joi);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });
  
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session");

  db.init("mongo"); // enter mongo, json or leave blank to choose whcih data model to use
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
