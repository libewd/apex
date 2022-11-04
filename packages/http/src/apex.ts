import { NextApiRequest, NextApiResponse } from 'next'
import { ApexJsonResponse } from './response'

export class Apex {
  constructor(private req: NextApiRequest, private res: NextApiResponse) {}

  json(value: unknown) {
    this.res.setHeader('Content-Type', 'application/json')
    return new ApexJsonResponse(value)
  }
}
