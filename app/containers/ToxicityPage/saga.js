import { takeLatest, call, put } from 'redux-saga/effects';
import * as toxicity from '@tensorflow-models/toxicity';

// Individual exports for testing
import { GET_TOXICITY } from './constants';
import { getToxicitySuccess } from './actions';

export function* getToxicitySaga({ sentence }) {
  // The minimum prediction confidence.
  const threshold = 0.9;
  const sentences = [sentence];

  try {
    const model = yield call(toxicity.load, threshold);
    const predictions = yield call(model.classify, sentences);

    yield put(getToxicitySuccess(predictions));
  } catch (e) {
    console.log(e);
  }
}

export default function* toxicityPageSaga() {
  yield takeLatest(GET_TOXICITY, getToxicitySaga);
}
