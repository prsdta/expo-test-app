import * as React from "react";
import { Text, View, Image, StyleSheet, Platform } from "react-native";
import { Forecast } from "../decoders/livedoor_weather";
import { Title } from "react-native-paper";

type PropsType = {
	forecast: Forecast;
};

// android needs polyfill?
// if (Platform.OS === "android") {
// 	require("intl"); // import intl object
// }

const dateFormatter =
	"Intl" in globalThis
		? new Intl.DateTimeFormat("ja").format
		: (date: Date) => date.toLocaleDateString("ja");

/** Component card to display the forecast for a single day. */
const DayForecast = ({ forecast }: PropsType) => {
	const { date, dateLabel, telop, image, temperature } = forecast;
	const formattedDate = dateFormatter(date);
	// cleanup trailing slash
	// TODO move to the decoder logic instead?
	const imageURL = image.url.href.replace(/\.gif\/$/, ".gif");

	return (
		<View
			style={{
				...styles.forecastWrapper,
			}}
		>
			<View style={styles.dateInfo}>
				<Title>{dateLabel}</Title>
				<Text>{formattedDate}</Text>
			</View>
			<Image
				source={{ uri: imageURL }}
				style={{ width: image.width, height: image.height }}
				accessibilityLabel={image.title}
			/>
			<Text style={styles.desc}>{telop}</Text>
			{temperature.max && (
				<View style={styles.temperatures}>
					<Text style={styles.max}>
						{(temperature.max?.celsius || "??") + "°C"}
					</Text>
					<Text style={styles.min}>
						{(temperature.min?.celsius || "??") + "°C"}
					</Text>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	forecastWrapper: {
		flex: 1,
		height: "45%",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	bigger: {
		flex: 3,
		width: "100%",
	},

	image: {
		maxWidth: "100%",
	},

	dateInfo: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
  },

	desc: {},

	temperatures: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	max: {
		fontSize: 20,
		fontWeight: "bold",
		color: "red",
		marginRight: 16, // make a gap
	},
	min: {
		color: "blue",
	},
});

export default DayForecast;
