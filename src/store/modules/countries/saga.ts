import { call, put, takeLatest } from 'redux-saga/effects'

import { Country } from '@/@types'
import { CountryService } from '@/services/CountryService'

import {
  fetchCountriesRequest,
  fetchCountriesSuccess,
  fetchCountriesFailure,
  setAvailableLanguages,
} from './slice'

const countryService = new CountryService()

function* fetchCountriesSaga() {
  try {
    const countries: Country[] = yield call([
      countryService,
      countryService.getAllCountries,
    ])
    yield put(fetchCountriesSuccess(countries))

    const languages: string[] = yield call(
      [countryService, countryService.extractUniqueLanguages],
      countries,
    )
    yield put(setAvailableLanguages(languages))
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'
    yield put(fetchCountriesFailure(errorMessage))
  }
}

export function* countriesSaga() {
  yield takeLatest(fetchCountriesRequest.type, fetchCountriesSaga)
}
