import { Request, Response } from 'express'
import { genericQuery } from '../genericQuery'

const getRoles = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
  return res.send(await genericQuery('role'))
}

export { getRoles }