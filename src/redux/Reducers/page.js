import { SET_API, SET_ID, SET_PAGE, SET_RESULTS } from '../Actions/actionTypes';

const initialState = {
  setApi: '',
  setPage: '',
  setResults: [],
  setId: 0,
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
  case SET_ID:
    return { ...state,
      setId: action.set };
  default:
    return state;
  }
};

export default page;
