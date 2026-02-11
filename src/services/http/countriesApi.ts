import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class CountriesApiClient {
  private readonly client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorMessage = error.response?.data?.message || error.message
        return Promise.reject(new Error(errorMessage))
      },
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }
}

const getApiBaseUrl = (): string => {
  const apiUrl = process.env.NEXT_PUBLIC_COUNTRIES_API_URL

  if (!apiUrl) {
    throw new Error(
      'NEXT_PUBLIC_COUNTRIES_API_URL is not defined. Please create a .env.local file with this variable.',
    )
  }

  return apiUrl
}

export const countriesApi = new CountriesApiClient(getApiBaseUrl())
