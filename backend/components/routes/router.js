const UserRouter = require("./userRoutes.js");

const routes = (app) => {
  app.use("/api/user", UserRouter);
};

module.exports = routes;
