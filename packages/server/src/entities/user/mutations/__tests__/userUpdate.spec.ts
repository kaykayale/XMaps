import { toGlobalId } from 'graphql-relay'
import { makeGraphQLRequest } from '../../../../../test/utils'
import { createUser } from '../../fixture/createUser'
import { loginUser } from '../../fixture/loginUser'

type Response = {
  data: {
    userUpdate: {
      user: {
        fullName: string
        email: string
        id: string
      }
      error: string
      clientMutationId: string
    }
  }
}

describe('UserUpdateMutation', () => {
  it('should update a user', async () => {
    const old = await createUser({ username: 'old' })
    const { token } = loginUser(old)
    const userGlobalId = toGlobalId('User', old.id)

    const mutation = `
      mutation a {
        userUpdate(input: {
          id: "${userGlobalId}"
          fullName: "updated"
          password: "123457"
        }) {
          user {
            fullName
            email
            id
          }
          error
          clientMutationId
        }
      }
    `

    const userUpdateResponse = await makeGraphQLRequest<Response>(mutation, token, old)

    expect(userUpdateResponse).toBeDefined()

    const { clientMutationId, error, user } = userUpdateResponse.data.userUpdate

    expect(clientMutationId).toBeDefined()
    expect(error).toBeFalsy()
    expect(user).toBeDefined()
    expect(user.fullName).not.toBe(old.fullName)
    expect(user.fullName).toBe('updated')
  })
})
