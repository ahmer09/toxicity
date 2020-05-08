/*
 *
 * ToxicityPage actions
 *
 */
import * as toxicity from '@tensorflow-models/toxicity';

import { GET_TOXICITY, GET_TOXICITY_SUCCESS } from './constants';

export function getToxicity(sentence) {
  return {
    type: GET_TOXICITY,
    sentence,
  };
}

export function getToxicitySuccess(meta) {
  return {
    type: GET_TOXICITY_SUCCESS,
    meta,
  };
}
