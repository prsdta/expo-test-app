import { createContext, useContext, useReducer } from "react";

import reducer, { AppState, Action } from "./reducer";
import initialState from "./initialState";

/** Create an empty context, as its real value is set by the Provider. */
const appStateContext = createContext({} as unknown) as React.Context<
	readonly [AppState, React.Dispatch<Action>]
>;

/**
 * Pre-initialized provider with a reducer.
 * Wrap an element with it do allow usage of the useAppContext hook.
 */
export const AppStateProvider = (props: React.PropsWithChildren<{}>) => {
	const reducerState = useReducer<React.Reducer<AppState, Action>>(reducer, initialState());
	return (
		<appStateContext.Provider value={reducerState}>
			{props.children}
		</appStateContext.Provider>
	);
};

/** Utility Hook that gives access to the global data */
export const useAppContext = () => {
	const state = useContext(appStateContext);
	if (state == null) {
		new Error(
			"Cannot find app state, ensure your component is wrapped by the Provider"
		);
	}
	return state;
};
