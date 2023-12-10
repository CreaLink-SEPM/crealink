const UserRouter = require("./userRoutes.js");
const PostRouter = require("./postRoutes.js");
const GoogleAuthRouter = require("./googleAuthRoutes.js");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/feed", PostRouter);
  app.use("/api/auth", GoogleAuthRouter);
};

module.exports = routes;
