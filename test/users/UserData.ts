import { faker } from '@faker-js/faker';
import { User, UserDto } from '../../src/users/data/UserModel';

export class UserData {
  static async singleUser(): Promise<UserDto> {
    const user = await User.create({
      name: faker.name.firstName(),
      email: faker.internet.email()
    });
    return {
      ...user.toObject(),
      id: user._id.toString()
    };
  }

  static async cleanUp() {
    await User.deleteMany({});
  }
}
