export interface Sub {
  nick: string
  subMonths: number,
  avatar: string,
  description?: string
}


export type SubsResponseFroApi = Array<{
  nick: string
  months: number
  profileUrl: string
  description: string
}>