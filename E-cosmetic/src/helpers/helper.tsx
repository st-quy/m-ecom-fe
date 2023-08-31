/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type CustomHeaders = {
  Accept: string
  'Content-Type': string
  'Access-Control-Allow-Origin': string
  Authorization?: string
}

type CustomAxiosRequestConfig<T> = AxiosRequestConfig & {
  headers: CustomHeaders
}

const instance = axios.create({
  baseURL: 'https://ecom-be-htgu.onrender.com'
})

export default function requestApi<T>(
  endpoint: string,
  method: string,
  body?: any,
  responseType: 'json' | 'arraybuffer' | 'blob' | 'document' | 'text' | 'stream' = 'json'
): Promise<AxiosResponse<T, any>> {
  const headers: CustomHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }

  const config: CustomAxiosRequestConfig<T> = {
    method: method,
    url: endpoint,
    headers: headers,
    data: body,
    responseType: responseType
  }

  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return instance
    .request<T>(config)
    .then((response) => response as AxiosResponse<T, any>)
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshtoken')
        window.location.href = '/sign-in'
      }
      throw error
    })
}
