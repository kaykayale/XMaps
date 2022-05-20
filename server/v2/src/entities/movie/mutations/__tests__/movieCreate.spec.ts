import { graphql } from 'graphql'
import { fromGlobalId, toGlobalId } from 'graphql-relay'
import { client } from '../../../../db/mongo'
import { schema } from '../../../../schemas/schema'
import { createUser } from '../../../user/fixture/createUser'
import { createCrew } from '../../../crew/fixture/createCrew'
import { movieRepository } from '../../../movie/movieRepository'
import { loginUser } from '../../../user/fixture/loginUser'

let movieId: string

afterAll(async () => {
  await movieRepository.deleteOne(movieId)

  await client.close()
})

describe('MovieCreateMutation', () => {
  it('should create a movie', async () => {
    const adminUser = await createUser()
    const crewMember = await createCrew()

    const crewMemberId = crewMember._id.toString()
    const crewMemberGlobalId = toGlobalId('Crew', crewMemberId)

    const { token } = loginUser(adminUser)

    const createMovieMutation = `
    mutation d {
      movieCreate(
        input: {
          title: "Fast and Furious 67", 
          duration: "139 min", 
          releaseDate: "2023-01-01", 
          genres: ["comedy", "drama", "family"], 
          ageGroup: "E", 
          rating: 5, 
          actors: ["${crewMemberGlobalId}"], 
          directors: ["${crewMemberGlobalId}"]
        }
      ) {
        insertedId
        error
      }
    }
    `

    const createMovieResponse = await graphql({
      schema,
      source: createMovieMutation,
      contextValue: {
        authorization: `Bearer ${token}`
      }
    }) as unknown as { data: { movieCreate: { insertedId: string, error: string } } }

    const { insertedId, error: createMovieError } = createMovieResponse.data.movieCreate

    expect(createMovieError).toBeFalsy()
    expect(insertedId).toBeTruthy()

    movieId = fromGlobalId(insertedId).id
  })
})