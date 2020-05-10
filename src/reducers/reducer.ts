import { LivedoorData } from "../decoders/livedoor_weather";
import { City } from "./initialState";

/**
 * Base interface needed for each action dispatched to the reducer
 */
export type Action =
	| {
			type: "SEARCH/RECIEVE_DATA";
			payload: LivedoorData;
	  }

/** Describes all data available in the Global State */
export type AppState = {
	cities: Record<string, City>;
	prefectures: Record<string, City[]>;
	externalData: LivedoorData | null;
};

/** Typical reducer function. */
export default function (state: AppState, action: Action) {
	switch (action.type) {
		case "SEARCH/RECIEVE_DATA":
			return { ...state, externalData: action.payload };
	}

	throw new Error(`No action of type ${action.type} found`);
}
