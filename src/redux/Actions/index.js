import { SET_API, SET_PAGE, SET_RESULTS, SET_ID } from './actionTypes';

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

const setIdAction = (set) => ({
  type: SET_ID,
  set,
});

export { setApiAction, setPageAction, setResultsAction, setIdAction };
