import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { faker } from "@faker-js/faker";

export const createUser = async (user) => {
  try {
    const userPromise = [];

    for (let i = 0; i < user; i++) {
      const tempUser = User.create({
        name: faker.person.fullName(),
        username: faker.internet.userName(),
        bio: faker.lorem.sentence(10),
        email: faker.internet.email(),
        password: "123456",
        avatar: {
          url: faker.image.avatar(),
          public_id: faker.system.fileName(),
        },
      });
      userPromise.push(tempUser);
    }

    await Promise.all(userPromise);

    console.log("User seeded");
    process.exit(1);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
