import { SET_PAGE } from "../Actions/actionTypes";

const initialState = {
    page: 'food',
    setApi: 'meal'
}

const page = (state = initialState, action) => {
    switch (action.type) {
      case SET_PAGE:
       return {...state, ...action.set};
      default:
       return state;    
    }
}

export default page;