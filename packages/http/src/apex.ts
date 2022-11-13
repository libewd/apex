import { NextApiRequest, NextApiResponse } from 'next'
import { ApexJsonResponse, ApexStatusResponse } from './response'

export class Apex {
  constructor(private req: NextApiRequest, private res: NextApiResponse) {}

  json(value: unknown) {
    return new ApexJsonResponse(value)
  }

  notFound() {
    return this.status(404, 'Not Found')
  }

  status(code: number, text: string) {
    return new ApexStatusResponse(code, text)
  }

  get isGetRequest() {
    return this.isRequestOfMethod('get')
  }

  /**
   * We compare the HTTP method of the incoming request with the given argument.
   * It is important we lowercase them both before we compare.
   *
   * https://www.rfc-editor.org/rfc/rfc7231#section-4.3
   *
   * @param method An HTTP method, such as GET or OPTIONS.
   * @returns `true`, if the request is of `method`, otherwise `false`.
   */
  isRequestOfMethod(method: string) {
    return this.req.method.toLowerCase() === method.toLowerCase()
  }
}
