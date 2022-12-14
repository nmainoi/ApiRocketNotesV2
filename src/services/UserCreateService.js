const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");
class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }
  async execute({ name, email, password }) {
    const CheckUserExists = await this.userRepository.findByEmail(email);

    if (CheckUserExists) throw new AppError("User already exists.", 400);

    const passwordHash = await hash(password, 8);

    const userCreated = await this.userRepository.create({name, email, passwordHash});
    return userCreated;
  }
}

module.exports = UserCreateService;
