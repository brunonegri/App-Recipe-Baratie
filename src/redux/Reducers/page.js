import { SET_API, SET_COUNTER, SET_PAGE, SET_RESULTS } from '../Actions/actionTypes';

const initialState = {
  setApi: '',
  setPage: '',
  setResults: [],
  setCounter: 0,
};

const page = (state = initialState, action) => {
  switch (action.type) {
  case SET_API:
    return { ...state,
      setApi: action.set };
  case SET_PAGE:
    return { ...state,
      setPage: action.set };
  case SET_RESULTS:
    return { ...state,
      setResults: action.set };
  case SET_COUNTER:
    return { ...state,
      setCounter: action.set };
  default:
    return state;
  }
};

export default page;
