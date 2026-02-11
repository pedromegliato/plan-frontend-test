import { all } from 'redux-saga/effects'

import { countriesSaga } from './modules/countries'

export default function* rootSaga() {
  yield all([countriesSaga()])
}
