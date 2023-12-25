const UserRouter = require("./userRoutes.js");
const PostRouter = require("./postRoutes.js");
const CommentRouter = require("./commentRoutes.js");
const GoogleAuthRouter = require("./googleAuthRoutes.js");
const AdminRouter = require("./adminRoutes.js");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  app.use("/api/feed", PostRouter);
  app.use("/api/auth", GoogleAuthRouter);
  app.use("/", async (req, res) => {});
  app.use("/api/comment", CommentRouter);
  app.use("/api/admin", AdminRouter);
};

module.exports = routes;
