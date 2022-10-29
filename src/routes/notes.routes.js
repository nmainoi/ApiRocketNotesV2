const {Router} = require("express")

const NotesController = require("../controllers/NotesController");
const notesRoutes = Router();
const notesController = new NotesController();
const ensureAuth = require("../middlewares/ensureAuth");

notesRoutes.use(ensureAuth);
notesRoutes.get("/",notesController.index);
notesRoutes.post("/",notesController.create);
notesRoutes.get("/:id",notesController.show);
notesRoutes.delete("/:id",notesController.delete);





module.exports = notesRoutes;
