import React, { createContext, useReducer, useContext } from 'react';

// Initial state structure
const initialState = {
  currentSlide: null, // e.g., slide id or index
  currentSubpart: 0, // index of current subpart
  dialog: [],         // array of dialog/messages
  userInteractions: {}, // e.g., answers, clicks, etc.
};

// Action types
const actionTypes = {
  SET_SLIDE: 'SET_SLIDE',
  SET_SUBPART: 'SET_SUBPART',
  ADD_DIALOG: 'ADD_DIALOG',
  SET_DIALOGS: 'SET_DIALOGS',
  SET_USER_INTERACTION: 'SET_USER_INTERACTION',
  RESET: 'RESET',
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_SLIDE:
      return { ...state, currentSlide: action.payload };
    case actionTypes.SET_SUBPART:
      return { ...state, currentSubpart: action.payload };
    case actionTypes.ADD_DIALOG:
      return { ...state, dialog: [...state.dialog, action.payload] };
    case actionTypes.SET_DIALOGS:
      return { ...state, dialog: action.payload };
    case actionTypes.SET_USER_INTERACTION:
      return {
        ...state,
        userInteractions: {
          ...state.userInteractions,
          [action.payload.key]: action.payload.value,
        },
      };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
}

// Create context
const StoreContext = createContext();

// Provider component
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// Custom hook for using the store
export function useStore() {
  return useContext(StoreContext);
}

// Export action types for use in components
export { actionTypes };
