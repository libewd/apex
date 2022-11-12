export interface ApexCanRespond {
  string: () => string
}

export type ApexResponse = ApexCanRespond

export class ApexJsonResponse implements ApexCanRespond {
  constructor(private value: unknown) {}

  string() {
    return JSON.stringify(this.value)
  }
}
