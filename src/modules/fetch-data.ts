import { API_ID, SECRET } from 'constant'
import http from 'https'
import { Base64 } from 'js-base64'

const encoded = Base64.encode(`${API_ID}:${SECRET}`)
export const Authorization = `Basic ${encoded}`

export async function fetchData<T>(url: string, headers?: Record<string, string>): Promise<T> {
  return new Promise((resolve, reject) => {
    http
      .get(url, { headers: { Authorization, ...headers } }, (res) => {
        let data = ''

        res.on('data', (chunk) => {
          data += chunk
        })

        res.on('end', () => {
          const parseData = JSON.parse(data)
          resolve(parseData)
        })
      })
      .on('error', (err) => {
        reject(err)
      })
  })
}
