import { NextApiResponse } from 'next'

export interface ApexCanRespond {
  respond: (res: NextApiResponse) => void
}

export type ApexResponse = ApexCanRespond

export class ApexStatusResponse implements ApexCanRespond {
  constructor(private code: number, private text: string) {}

  respond(res: NextApiResponse) {
    res.status(this.code).send(this.text)
  }
}

export class ApexJsonResponse implements ApexCanRespond {
  constructor(private value: unknown) {}

  headers(res: NextApiResponse) {
    res.setHeader('Content-Type', 'application/json')
  }

  respond(res: NextApiResponse) {
    this.headers(res)
    res.send(JSON.stringify(this.value))
  }
}
