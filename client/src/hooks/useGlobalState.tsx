import { createContext, useContext, useReducer, Dispatch } from "react";
import { LOADING, LOGIN, LOGOUT } from "../constants/action.constants";
import { Reducer } from "../types/function.types";
import { ChildrenProps } from "../types/prop.types";
import { GlobalState } from "../types/state.types";

const initialGlobalState = {
  accessToken: null,
  loading: false,
};

const GlobalContext = createContext<{
  globalState: GlobalState;
  dispatch: Dispatch<React.SetStateAction<any>>;
}>({
  globalState: initialGlobalState,
  dispatch: () => null,
});

const globalReducer: Reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    case LOGIN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        accessToken: null,
      };
    default:
      return state;
  }
};

const initialValue: GlobalState = initialGlobalState;

export const GlobalProvider = ({ children }: ChildrenProps) => {
  const [globalState, dispatch] = useReducer(globalReducer, initialValue);
  return (
    <GlobalContext.Provider value={{ globalState, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  const { globalState, dispatch } = useContext(GlobalContext);
  return [globalState, dispatch] as const;
};
