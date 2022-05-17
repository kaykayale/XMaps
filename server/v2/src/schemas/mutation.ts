import {
  GraphQLObjectType
} from 'graphql'

import { movieMutations } from '../entities/movie/mutations/movie'
import { crewMutations } from '../entities/crew/mutations/crew'
import { userMutations } from '../entities/user/mutations/user'
import { reviewMutations } from '../entities/review/mutations/review'

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root mutation type',
  fields: {
    ...movieMutations,
    ...crewMutations,
    ...userMutations,
    ...reviewMutations
  }
})
