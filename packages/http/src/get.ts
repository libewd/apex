import { Apex } from './apex'
import { ApexHandler } from './handler'
import type { NextApiRequest, NextApiResponse } from 'next'

export function get(handler: ApexHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method.toLowerCase() !== 'get') {
      return res.status(404).send('Not Found')
    }
    const apexRes = handler(new Apex(req, res))
    res.send(apexRes.string())
  }
}
