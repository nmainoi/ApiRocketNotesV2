const {Router} = require("express")

const routes = Router();

const UserRoutes  = require("./users.routes");
const NotesRoutes = require("./notes.routes");
const TagsRoutes = require("./tags.routes");
routes.use("/users", UserRoutes);
routes.use("/notes", NotesRoutes);
routes.use("/tags", TagsRoutes);
module.exports = routes;