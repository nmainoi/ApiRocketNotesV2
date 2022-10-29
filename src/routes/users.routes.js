const {Router} = require("express")

const multer = require("multer");
const uploadConfig = require("../config/upload");

const UsersController = require("../controllers/UsersController");
const UsersAvatarController = require("../controllers/UserAvatarController");
const ensureAuth = require("../middlewares/ensureAuth");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const userController = new UsersController();

const userAvatarController = new UsersAvatarController();


usersRoutes.post("/",userController.create);
usersRoutes.put("/",ensureAuth,userController.update);
usersRoutes.patch("/avatar",ensureAuth,upload.single("avatar"),userAvatarController.update);


module.exports = usersRoutes;
