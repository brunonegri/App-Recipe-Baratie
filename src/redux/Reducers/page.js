import { SET_PAGE } from '../Actions/actionTypes';

const initialState = {
  page: '',
  setApi: '',
};

const page = (state = initialState, action) => {
  switch (action.type) {
  case SET_PAGE:
    return { ...state,
      page: action.set };
  default:
    return state;
  }
};

export default page;
