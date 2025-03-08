export interface Log {
  _id: string
  url: string
  user: string
  // Clarity ID, which is also Device ID
  clarity: string
  data: string
  timestamp: number
  ip: string
}
