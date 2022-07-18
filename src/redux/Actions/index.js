import { SET_API, SET_PAGE, SET_RESULTS } from './actionTypes';

const setApiAction = (set) => ({
  type: SET_API,
  set,
});

const setPageAction = (set) => ({
  type: SET_PAGE,
  set,
});

const setResultsAction = (set) => ({
  type: SET_RESULTS,
  set,
});

export { setApiAction, setPageAction, setResultsAction };
