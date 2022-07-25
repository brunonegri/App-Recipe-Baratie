import { SET_API, SET_PAGE, SET_RESULTS, SET_COUNTER } from './actionTypes';

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

const setCounterAction = (set) => ({
  type: SET_COUNTER,
  set,
});

export { setApiAction, setPageAction, setResultsAction, setCounterAction };
