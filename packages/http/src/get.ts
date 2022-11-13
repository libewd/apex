import { Apex } from './apex'
import { ApexHandler } from './handler'
import type { NextApiRequest, NextApiResponse } from 'next'

export function get(handler: ApexHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const apex = new Apex(req, res)
    Promise.resolve()
      .then(() => {
        if (!apex.isGetRequest) return apex.notFound()
        return handler(apex)
      })
      .then((apexRes) => {
        apexRes.respond(res)
      })
  }
}
