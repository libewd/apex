export interface ApexCanRespond {
  string: () => string
}

export type ApexResponse = ApexCanRespond

export class ApexJsonResponse implements ApexCanRespond {
  private textEncoder = new TextEncoder()
  constructor(private value: unknown) {}

  string() {
    return JSON.stringify(this.value)
  }
}
