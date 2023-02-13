import { Service } from "diod";
import { UserDto, User } from "./UserModel";
import { UserRepository } from "./UserRepository";

@Service()
export class MongoUserRepository extends UserRepository {
    async find(criteria:  Record<string, unknown>): Promise<UserDto[]> {
        const { id, ...rest } = criteria
        if (id) {
            return User.findById(id).lean({virtuals: true});
        }
        return User.find(rest).lean({virtuals: true});
    }

    async remove(key: string): Promise<string> {
        await User.remove({ _id: key });
        return key;
    }

    async save(data: UserDto): Promise<string> {
        if (data.id) {
            await User.updateOne(data);
            return data.id;
        } else;{
            const user = await User.create(data);
            return user._id.toString();
        }
    }

}