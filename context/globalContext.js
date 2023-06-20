import { createContext } from 'react';

export const MyContext = createContext();

export const initialState = {
  productDetailModalShown: false,
  productDetailId: null,
  email: '',
  password: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_EMAIL':
      return { ...state, email: action.payload };
    case 'UPDATE_PASSWORD':
      return { ...state, password: action.payload };

    case 'TOGGLE_MODAL':
      return {
        ...state,
        productDetailModalShown: !state.productDetailModalShown,
        productDetailId: action.dishId,
      };
      
    default:
      return state;
  }
};
