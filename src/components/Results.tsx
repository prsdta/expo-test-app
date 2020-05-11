import * as React from "react";
import { Text, View } from "react-native";
import { useAppContext } from "../reducers/useAppState";
import DayForecast from "./DayForecast";
import { LivedoorData, Forecast } from "../decoders/livedoor_weather";

const Results = () => {
	const [state] = useAppContext();

	const forecasts = state.externalData?.forecasts || [];

	return (
		<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
			{forecasts.map((forecast) => (
				<DayForecast key={forecast.date.getDate()} forecast={forecast} />
			))}
		</View>
	);
};

export default Results;
