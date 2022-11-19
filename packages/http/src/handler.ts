import { NextApiRequest, NextApiResponse } from 'next'
import { Apex } from './apex'
import { ApexResponse } from './response'

export type ApexHandler = (apex: Apex) => ApexResponse

export function makeHandlerForRequestMethod(method: string) {
  return function (handler: ApexHandler) {
    return (req: NextApiRequest, res: NextApiResponse) => {
      const apex = new Apex(req, res)
      let response: ApexResponse = apex.notFound()
      if (apex.isRequestOfMethod(method)) response = handler(apex)
      response.respond()
    }
  }
}
