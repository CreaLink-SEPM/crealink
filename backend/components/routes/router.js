const UserRouter = require("./userRoutes.js");
const PostRouter = require("./postRoutes.js");

const routes = (app) => {
  app.use("/api/user", UserRouter);
  // app.use("/api/feed", PostRouter); 
};



module.exports = routes;
