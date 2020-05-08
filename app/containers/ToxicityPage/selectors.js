import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the toxicityPage state domain
 */

const selectToxicityPageDomain = state => state.toxicityPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ToxicityPage
 */

const makeSelectToxicityPage = () =>
  createSelector(
    selectToxicityPageDomain,
    substate => substate,
  );

export default makeSelectToxicityPage;
export { selectToxicityPageDomain };
