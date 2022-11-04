import { Apex } from './apex'
import { ApexResponse } from './response'

export type ApexHandler = (a: Apex) => ApexResponse
