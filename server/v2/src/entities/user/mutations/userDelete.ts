import {
  GraphQLID,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'
import { UserModel } from '../userModel'
import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay'
import { getHeadersPayload } from '../../../auth/getHeadersPayload'

export const userDelete = mutationWithClientMutationId({
  name: 'userDelete',
  description: 'Delete a user using its id',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    deletedCount: {
      type: GraphQLString,
      resolve: response => response.deletedCount
    },
    error: {
      type: GraphQLString,
      resolve: response => response.error
    }
  },
  mutateAndGetPayload: async ({ id }, ctx) => {
    const { error, payload } = getHeadersPayload(ctx)

    if (error || payload === null) {
      return {
        error: 'Unauthorized',
        review: null
      }
    }

    if (payload.id !== fromGlobalId(id).id) {
      return {
        error: 'Unauthorized'
      }
    }

    try {
      const response = await UserModel.deleteOne({
        _id: fromGlobalId(id).id
      })

      return response
    } catch (error: any) {
      return { error: error.message }
    }
  }
})
