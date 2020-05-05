import { AppState } from "./reducer";
import citiesData from "../citiesData.json";

export type City = {
	id: string;
	title: string;
};

export type Prefecture = {
	name: string;
	cities: City[];
};

/** 
 * Generate an object with data for initializating the reducer for the global 
 * App state. Uses the statically generated json of the available cities.
 */
export default function initialState(): AppState {
	const cities: Record<
		string,
		City
	> = citiesData
		.map((pref: Prefecture) =>
			Object.fromEntries(pref.cities.map((c: City) => [c.id, c]))
		)
		.reduce((cities, city) => Object.assign(cities, city));

	const prefectures: Record<string, City[]> = Object.fromEntries(
		citiesData.map((pref: Prefecture) => [
			pref.name,
			pref.cities.map((c: City) => cities[c.id]),
		])
	);

	return {
		prefectures,
		cities,
		externalData: null,
	};
}
