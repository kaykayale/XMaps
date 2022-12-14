import { toGlobalId } from 'graphql-relay'
import { createReview } from '../../fixtures/createReview'
import { loginUser } from '../../../user/fixture/loginUser'
import { createUser } from '../../../user/fixture/createUser'
import { ReviewModel } from '../../reviewModel'
import { makeGraphQLRequest } from '../../../../../test/utils'

type Response = {
  data: {
    reviewDelete: {
      error: string
      clientMutationId: string
      deletedCount: string
    }
  }
}

describe('ReviewDeleteMutation', () => {
  it('should let the user delete one of his reviews', async () => {
    const user = await createUser({ username: 'user' })
    const review = await createReview()
    const { token } = loginUser(user)

    const reviewsBeforeDeletion = await ReviewModel.count()

    const reviewGlobalId = toGlobalId('Review', review.id)

    const mutation = `
      mutation a {
        reviewDelete(input: {
          id: "${reviewGlobalId}"
        }) {
          error
          clientMutationId
          deletedCount
        }
      }
    `

    const reviewDeleteResponse = await makeGraphQLRequest<Response>(mutation, token, user)

    expect(reviewDeleteResponse).toBeDefined()

    const { clientMutationId, error, deletedCount } = reviewDeleteResponse.data.reviewDelete
    const reviewsAfterDeletion = await ReviewModel.count()

    expect(clientMutationId).toBeDefined()
    expect(error).toBeFalsy()
    expect(deletedCount).toBeDefined()
    expect(reviewsAfterDeletion).toBe(reviewsBeforeDeletion - Number(deletedCount))
  })
})
