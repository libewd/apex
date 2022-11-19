import { NextApiResponse } from 'next'

interface ApexCanRespond {
  respond: () => void
}

export type ApexResponse = ApexCanRespond

export class ApexJsonResponse implements ApexCanRespond {
  constructor(private res: NextApiResponse, private value: unknown) {}

  headers() {
    this.res.setHeader('Content-Type', 'application/json')
  }

  respond() {
    this.headers()
    this.res.send(JSON.stringify(this.value))
  }
}

export class ApexStatusResponse implements ApexCanRespond {
  constructor(
    private res: NextApiResponse,
    private code: number,
    private text: string
  ) {}

  respond() {
    this.res.status(this.code).send(this.text)
  }
}
