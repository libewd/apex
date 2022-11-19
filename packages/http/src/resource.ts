import { NextApiRequest, NextApiResponse } from 'next'
import { Apex } from './apex'
import { ApexResponse } from './response'

type Optional<T> = T | null

type ApexController = Partial<{
  index: () => ApexResponse
  store: () => ApexResponse
  show: (id: string) => ApexResponse
  update: (id: string) => ApexResponse
  destroy: (id: string) => ApexResponse
}>

export type ApexResourceHandler = (apex: Apex) => Optional<ApexController>

function assertFunctionWith<
  F extends (...args: Array<unknown>) => R,
  R = ReturnType<F>
>(value: R) {
  return (fn: F, ...params: Parameters<F>) => (fn ? fn(...params) : value)
}

export function resource<T>(handler: ApexResourceHandler) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const apex = new Apex<T>(req, res)
    const controller = handler(apex)

    let response: ApexResponse = apex.notFound()
    const assertFunctionWithNotFound = assertFunctionWith(response)

    for (;;) {
      if (!controller) {
        break
      }

      let id: string

      const idParam = apex.query('id')
      const hasIdParam = idParam !== undefined

      if (hasIdParam) {
        const idParams = idParam as Array<string>

        if (idParams.length > 1) break
        id = idParams.shift()
      }

      response = (() => {
        if (apex.isGetRequest) {
          return hasIdParam
            ? assertFunctionWithNotFound(controller.show, id)
            : assertFunctionWithNotFound(controller.index)
        } else if (apex.isPostRequest)
          return assertFunctionWithNotFound(controller.store)
        else if (apex.isPatchRequest)
          return assertFunctionWithNotFound(controller.update, id)
        else if (apex.isDeleteRequest)
          return assertFunctionWithNotFound(controller.destroy, id)
      })()

      break
    }

    response.respond()
  }
}
