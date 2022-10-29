const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");
const { response } = require("express");
class UsersAvatarController {

async update(req, res) {
    const user_id = req.user.id;
    const AvatarFilename = req.file.filename;

    const  diskStorage = new DiskStorage();

    const user = await knex("users").where({ id: user_id }).first();
    if(!user){
        throw new AppError("Only auth user can change avatar picture", 401);
    }
    if(user.avatar){
         await diskStorage.deleteFile(user.avatar);
    }
    const filename = await diskStorage.saveFile(AvatarFilename);
    user.avatar = filename;

    await knex("users").update(user).where({ id: user_id });
    return res.json(user);
}

}

module.exports = UsersAvatarController;