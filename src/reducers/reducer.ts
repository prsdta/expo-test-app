import { LivedoorData } from "../decoders/livedoor_weather";
import { City } from "./initialState";
import { Errors } from "io-ts";

/**
 * Base interface needed for each action dispatched to the reducer
 */
export type Action =
	| {
			type: "SEARCH/RECIEVE_DATA";
			payload: LivedoorData;
	  }
	| {
			type: "SEARCH/ERROR";
			payload: Error | Errors;
	  };

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
		case "SEARCH/ERROR":
			return { ...state, error: action.payload };
	}

	throw new Error(`No action of type ${action.type} found`);
}
