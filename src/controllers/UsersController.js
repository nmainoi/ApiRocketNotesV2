const AppError = require("../utils/AppError");
const { hash, compare } = require("bcryptjs");
const SqliteConnection = require("../database/sqlite");
const UserCreateService = require("../services/UserCreateService");
const UserRepository = require("../repositories/UserRepository");

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({ name, email, password });
    return res.status(201).json();
  }
  async update(req, res) {
    const { name, email, password, avatar, old_password } = req.body;
    const user_id = req.user.id;

    const database = await SqliteConnection();

    const CheckUserExists = await database.get(
      `SELECT * FROM users WHERE id = ?`,
      [user_id]
    );

    if (!CheckUserExists) throw new AppError("User not found.", 400);

    //verify password
    console.log(old_password,password);
    if (old_password && password ) {
      const checkOldPassword = await compare(
        old_password,
        CheckUserExists.password
      );

      if (!checkOldPassword)
        throw new AppError("Password does not match.", 400);
    } else if(password.length > 0) {
    throw new AppError("Password does not match.", 400);}

    const userWithSameEmail = await database.get(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );

    if (userWithSameEmail && userWithSameEmail.id != user_id)
      throw new AppError("Email already in use.", 400);

    // verify if request send user name if not use from database and do the same for all fields
    const nameToSave = name ? name : CheckUserExists.name;
    const emailToSave = email ? email : CheckUserExists.email;
    const avatarToSave = avatar ? avatar : CheckUserExists.avatar;
    const passwordToSave = password
        ? await hash(password, 8)
        : CheckUserExists.password;

    await database.run(
      `UPDATE users SET name = ?, email = ?, password = ?, avatar = ?, updated_at = DATETIME('now') WHERE id = ?`,
      [nameToSave, emailToSave, passwordToSave, avatarToSave, user_id]
    );

    return res.status(200).json();
  }
}

module.exports = UsersController;
