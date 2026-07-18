import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

export  const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
};

// TypeScript Types derived directly from the store itself
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];