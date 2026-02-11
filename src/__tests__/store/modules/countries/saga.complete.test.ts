import { Country } from '@/@types'
import { countriesSaga } from '@/store/modules/countries/saga'

const mockCountries: Country[] = [
  {
    code: 'BR',
    name: 'Brasil',
    officialName: 'República Federativa do Brasil',
    nativeName: 'Brazil',
    continent: 'South America',
    region: 'Americas',
    subregion: 'South America',
    capital: 'Brasília',
    population: 212559409,
    area: 8515767,
    languages: ['Portuguese', 'English'],
    currencies: [],
    flag: '',
    flagAlt: '',
    borders: [],
    timezones: [],
    landlocked: false,
    independent: true,
  },
]

type GeneratorFunction = (...args: unknown[]) => Generator

describe('Countries Saga Worker Direct', () => {
  let fetchCountriesSagaWorker: GeneratorFunction | null

  beforeEach(() => {
    fetchCountriesSagaWorker = null

    const sagaGen = countriesSaga()
    const takeLatestEffect = sagaGen.next().value

    if (takeLatestEffect && takeLatestEffect.payload && takeLatestEffect.payload.args) {
      fetchCountriesSagaWorker = takeLatestEffect.payload.args[1] as GeneratorFunction
    }
  })

  it('should have saga worker function', () => {
    expect(fetchCountriesSagaWorker).toBeDefined()
    expect(typeof fetchCountriesSagaWorker).toBe('function')
  })

  it('should execute saga worker successfully', () => {
    if (!fetchCountriesSagaWorker) return

    const gen = fetchCountriesSagaWorker()

    let result = gen.next()
    expect(result.done).toBe(false)
    expect(result.value).toBeDefined()

    result = gen.next(mockCountries)
    expect(result.done).toBe(false)

    result = gen.next()
    expect(result.done).toBe(false)

    const mockLanguages = ['Portuguese', 'English']
    result = gen.next(mockLanguages)
    expect(result.done).toBe(false)

    result = gen.next()
    expect(result.done).toBe(true)
  })

  it('should handle saga worker error with Error instance', () => {
    if (!fetchCountriesSagaWorker) return

    const gen = fetchCountriesSagaWorker()
    const error = new Error('Network error')

    gen.next()

    const result = gen.throw(error)

    expect(result.value).toBeDefined()
    expect(result.done).toBe(false)
  })

  it('should handle saga worker error with non-Error', () => {
    if (!fetchCountriesSagaWorker) return

    const gen = fetchCountriesSagaWorker()
    const error = { message: 'Unknown error' }

    gen.next()

    const result = gen.throw(error)

    expect(result.value).toBeDefined()
    expect(result.done).toBe(false)
  })
})
