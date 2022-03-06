import React, { createContext, useReducer } from 'react';
import { useContext } from 'react';
import { images, ImageInfo } from '../data/images';

type _ProviderProps = {
  children: React.ReactNode;
  [key: string]: any;
};

type State = {
  images: ImageInfo[];
  favorites: number[];
};

type Action = {
  type: string;
  payload: any;
};

type Dispatch = (action: Action) => void;

const StateContext = createContext<State | undefined>(undefined);

const DispatchContext = createContext<Dispatch | undefined>(undefined);

const StateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE': {
      const favorites = [...state.favorites, action.payload];

      return {
        ...state,
        favorites,
      };
    }

    case 'REMOVE_FROM_FAVORITE': {
      const index = state.favorites.indexOf(action.payload);

      if (index === -1) {
        return state;
      }

      const favorites = state.favorites.filter((id) => id !== action.payload);

      return {
        ...state,
        favorites,
      };
    }

    default:
      return state;
  }
};

const ContextProvider = ({ children }: _ProviderProps) => {
  const [state, dispatch] = useReducer(StateReducer, {
    images,
    favorites: [],
  });

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  );
};

const useContextState = () => {
  const state = useContext(StateContext);

  if (state !== undefined) {
    return state;
  }

  throw new Error('useContextState must be used inside ContextProvider');
};

const useContextDispatch = () => {
  const dispatch = useContext(DispatchContext);

  if (dispatch !== undefined) {
    return dispatch;
  }

  throw new Error('useContextDispatch must be used inside ContextProvider');
};

export { ContextProvider, useContextState, useContextDispatch, StateContext, DispatchContext };
