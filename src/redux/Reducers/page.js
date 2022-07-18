import SET_API from '../Actions/actionTypes';

const initialState = {
  setApi: '',
};

const page = (state = initialState, action) => {
  switch (action.type) {
  case SET_API:
    return { ...state,
      setApi: action.set };
  default:
    return state;
  }
};

export default page;
