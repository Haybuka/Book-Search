import React, { createContext, useReducer } from "react";

export const StoreContext = createContext();
export const ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

const storeRedcuer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_COFFEE_STORES:
      return { ...state, coffeeStores: action.payload.coffeeStores };

    case ACTION_TYPES.SET_LAT_LONG:
      return { ...state, latLong: action.payload.latLong };
    default:
      return state;
  }
};
export const StoreProvider = ({ children }) => {
  let values = { latLong: "", coffeeStores: [] };
  const [state, dispatch] = useReducer(storeRedcuer, values);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
