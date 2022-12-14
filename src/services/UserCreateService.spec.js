const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");


describe("User create Service", () => {
    
    it("user should be create", async () => {
        const user = {
            name: "John Doe",
            email: "jhonDoe@email.com",
            password: "123456",
        };
        const userRepositoryInMemory = new UserRepositoryInMemory ();
        const userCreateService = new UserCreateService(userRepositoryInMemory);
    
        const userCreated = await userCreateService.execute(user);
        expect(userCreated).toHaveProperty("id");
    });

})
