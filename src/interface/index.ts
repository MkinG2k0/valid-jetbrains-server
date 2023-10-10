interface CensysHost {
  ip: string
}

interface CensysService {
  service_name: string

  port: number
  http: {
    response: {
      status_code: number
    }
  }
}

export interface CensysHostPacket {
  code: number
  result: {
    services: CensysService[]
  }
  err: string
}

export interface CensysHostsPacket {
  code: number
  result: {
    hits: CensysHost[]
  }
  err: string
}
