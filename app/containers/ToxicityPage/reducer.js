/*
 *
 * ToxicityPage reducer
 *
 */
import produce from 'immer';
import { GET_TOXICITY, GET_TOXICITY_SUCCESS } from './constants';

export const initialState = {
  sentence: '',
};

/* eslint-disable default-case, no-param-reassign */
const toxicityPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_TOXICITY:
        draft.sentence = action.sentence;
        break;
      case GET_TOXICITY_SUCCESS:
        draft.predictions = action.meta;
        break;
    }
  });

export default toxicityPageReducer;
