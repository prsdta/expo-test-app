import { LivedoorData } from "../decoders/livedoor_weather";
import { City } from "./initialState";

/**
 * Base interface needed for each action dispatched to the reducer
 */
export interface Action<T = void> {
	type: string;
	payload?: T;
}

/** Describes all data available in the Global State */
export type AppState = {
	cities: Record<string, City>;
	prefectures: Record<string, City[]>;
	externalData: LivedoorData | null;
};

/**
 * This holds the list of all the actions and the handler for each of them
 */
const ActionRegister: Record<
	string,
	(state: AppState, action: Action) => AppState
> = {};

/** Typical reducer function. */
export default function (state: AppState, action: Action) {
	const reduce = ActionRegister[action.type];
	if (reduce === void 0)
		throw new Error(`No action of type ${action.type} found`);

	return reduce(state, action);
}
