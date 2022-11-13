import { Apex } from './apex'
import { ApexResponse } from './response'

export type ApexHandler = (apex: Apex) => ApexResponse
