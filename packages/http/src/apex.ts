import { NextApiRequest, NextApiResponse } from 'next'
import { ApexJsonResponse, ApexStatusResponse } from './response'

export class Apex<T = any> {
  constructor(private req: NextApiRequest, private res: NextApiResponse) {}

  query(key: string) {
    return this.req.query[key]
  }

  json(value: unknown) {
    return new ApexJsonResponse(this.res, value)
  }

  notFound() {
    return this.status(404, 'Not Found')
  }

  status(code: number, text: string) {
    return new ApexStatusResponse(this.res, code, text)
  }

  get isGetRequest() {
    return this.isRequestOfMethod('get')
  }

  get isPostRequest() {
    return this.isRequestOfMethod('post')
  }

  get isPatchRequest() {
    return this.isRequestOfMethod('patch')
  }

  get isDeleteRequest() {
    return this.isRequestOfMethod('delete')
  }

  /**
   * We compare the HTTP method of the incoming request with the given argument.
   * It is important we lowercase them both before we compare.
   *
   * https://httpwg.org/specs/rfc9110.html#methods
   *
   * @param method An HTTP method, such as GET or OPTIONS.
   * @returns `true`, if the request is of `method`, otherwise `false`.
   */
  isRequestOfMethod(method: string) {
    return this.req.method.toLowerCase() === method.toLowerCase()
  }
}
