const {Router} = require("express")

const TagsController = require("../controllers/TagsController");
const tagRoutes = Router();
const tagsController = new TagsController();
const ensureAuth = require("../middlewares/ensureAuth");

tagRoutes.use(ensureAuth);


tagRoutes.get("/",tagsController.index);






module.exports = tagRoutes;
