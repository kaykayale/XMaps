import { GraphQLObjectType } from 'graphql'
import { movieQueries } from '../entities/movie/queries/queries'
import { personQueries } from '../entities/person/queries/queries'
import { userQueries } from '../entities/user/queries/queries'
import { reviewQueries } from '../entities/review/queries/queries'
import { nodeField, nodesField } from '../graphql/nodeInterface'

export const query = new GraphQLObjectType({
  name: 'Query',
  description: 'The root query type',
  fields: () => ({
    ...movieQueries,
    ...personQueries,
    ...userQueries,
    ...reviewQueries,
    node: nodeField,
    nodes: nodesField
  })
})
