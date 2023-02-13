import { connectTestDb, disconnectTestDb, getRequest } from '../../bootstrap'
import { UserData } from '../UserData';

describe('getUser', () => {
    beforeAll(async () => {
        await connectTestDb()
    })

    afterAll(async () => {
        await UserData.cleanUp()
        await disconnectTestDb()
    })
    
    test('should throw not found', async () => {
        //arrange
        
        //act
        const response = await getRequest('/v1/users/pepito')

        //assert
        expect(response.statusCode).toEqual(404)
    });

    test('should get user', async () => {
        //arrange
        const user = await UserData.singleUser()

        //act
        const response = await getRequest(`/v1/users/${user.id}`)

        //assert
        expect(response.statusCode).toEqual(200)
        expect(response.json().id).toEqual(user.id)
        expect(response.json().name).toEqual(user.name)
        expect(response.json().email).toEqual(user.email)
    });
});
