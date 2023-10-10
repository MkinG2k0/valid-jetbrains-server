import { api, jbQuery } from 'constant'
import { CensysHostPacket, CensysHostsPacket } from 'interface'
import { fetchData } from 'modules/fetch-data'

export async function main() {
  try {
    const hostsPacket = await fetchData<CensysHostsPacket>(`${api}/hosts/search?q=${jbQuery}`)

    if (hostsPacket.code !== 200) {
      throw new Error(hostsPacket.err)
    }

    const addresses: string[] = []

    for (const hit of hostsPacket.result.hits) {
      console.log(`\nChecking IP: ${hit.ip}`)

      const hostPacket = await fetchData<CensysHostPacket>(`${api}/hosts/${hit.ip}`)

      if (hostPacket.code !== 200) {
        continue
      }

      for (const service of hostPacket.result.services) {
        const statusCode = service.http.response.status_code

        if (service.service_name !== 'HTTP') {
          continue
        }

        console.log(` - Checking port: ${service.port} `)

        if (statusCode === 302) {
          const address = `${hit.ip}:${service.port}`
          console.log(` - FOUND ${address}`)
          addresses.push(address)
        }
        break
      }

      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    console.log(`\n Total addresses found: ${addresses.length} \n result: \n`, addresses)
  } catch (error) {
    console.error(error)
  }
}
