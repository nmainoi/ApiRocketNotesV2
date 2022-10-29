const {Router} = require("express")
const ensureAuth = require("../middlewares/ensureAuth");
const UsersController = require("../controllers/UsersController");
const usersRoutes = Router();
const userController = new UsersController();




usersRoutes.post("/",userController.create);
usersRoutes.put("/",ensureAuth,userController.update);



module.exports = usersRoutes;
