import process from 'process'

export const value = 1
export const api = 'https://search.censys.io/api/v2'
export const jbQuery: string = encodeURIComponent(
  'services.http.response.headers.location: account.jetbrains.com/fls-auth',
)
export const API_ID = process.env.API_ID
export const SECRET = process.env.SECRET
