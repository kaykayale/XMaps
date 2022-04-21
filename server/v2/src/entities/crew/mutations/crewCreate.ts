import { GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import { crewRepository } from '../crewRepository'
import { crewInputType } from '../crewTypes'

export const crewCreate = mutationWithClientMutationId({
  name: 'crewCreate',
  description: 'Add a crew member',
  inputFields: {
    ...crewInputType
  },
  outputFields: {
    insertedId: {
      type: GraphQLString,
      resolve: response => response.insertedId
    }
  },
  mutateAndGetPayload: async (payload) => {
    return (await crewRepository.insertOne({ ...payload }))
  }
})