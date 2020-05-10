import React, { useState, useRef } from "react";
import ReactNative, { StyleSheet, View } from "react-native";

import { TextInput, HelperText, Button } from "react-native-paper";

import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { Errors } from "io-ts";

import { useAppContext } from "../reducers/useAppState";
import { getJson } from "../utils/http";

import { AppState } from "../reducers/reducer";
import LivedoorDataC, { LivedoorData } from "../decoders/livedoor_weather";
import { Option, some, none, fold } from "fp-ts/lib/Option";
import { PathReporter } from "io-ts/lib/PathReporter";

/** Keep string centralized */
export const labels = {
	sendButton: "調べる",
	inputName: "地方名",
	inputAccessibilityLabel: "地方名を入力してください",
	fetchError: "Fetch Error",
	cityNotFound: "この街は見つかれません",
	inputErrorTestID: "input-error-helper",
};

/**
 * Duo of an input and a submit button for the user to enter the desired place.
 *
 * TODO add a onChange callback for an autocompletion?
 *
 */
const InputArea = () => {
	const [place, setPlace] = useState("");
	const [error, setError] = useState("");
	const inputRef = useRef<ReactNative.TextInput>(null!);

	const [state, dispatch] = useAppContext();
	const fetchAndDispatchData = () =>
		pipe(
			findCityByName(state, place),
			fold(
				() => setError(labels.cityNotFound),
				(city) => {
					getByCity(city).then(
						E.fold<Error | Errors, LivedoorData, void>(
							(err) => {
								if (Array.isArray(err))
									console.log(PathReporter.report(E.left(err)));

								dispatch({ type: "SEARCH/ERROR", payload: err });
								setError(labels.fetchError);
							},
							(data) => dispatch({ type: "SEARCH/RECIEVE_DATA", payload: data })
						)
					);
				}
			)
		);

	return (
		<View style={styles.inputGroup}>
			<View style={styles.input}>
				<TextInput
					ref={inputRef}
					label={labels.inputName}
					accessibilityLabel={labels.inputAccessibilityLabel}
					value={place}
					onChangeText={setPlace}
					onSubmitEditing={() => {
						setError(""); // cleanup
						fetchAndDispatchData();
					}}
				/>
				<HelperText
					type="error"
					visible={error !== ""}
					testID={labels.inputErrorTestID}
				>
					{error}
				</HelperText>
			</View>
			<Button
				style={styles.button}
				mode="outlined"
				onPress={() => {
					setError(""); // cleanup
					// close the keyboard on press
					inputRef.current.blur();
					fetchAndDispatchData();
				}}
			>
				{labels.sendButton}
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "700",
		color: "#333",
		margin: 16,
	},
	// TODO change the HelperText position to avoid the button growing
	inputGroup: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		paddingLeft: 16,
		paddingRight: 16,
	},
	input: {
		flex: 5,
		marginRight: 8,
	},
	button: {
		flex: 1,
		justifyContent: "center",
	},
});

/** Search into the state dictionary a city by its name */
function findCityByName(state: AppState, query: string): Option<string> {
	if (!query) return none;

	for (const [id, obj] of Object.entries(state.cities)) {
		if (obj.title.includes(query)) {
			return some(id);
		}
	}
	return none;
}

/** Fetch data at the endpoint */
function getByCity(city: string) {
	const req = getJson(
		"http://weather.livedoor.com/forecast/webservice/json/v1?city=" + city
	);

	// TODO improve error handling, use TaskEither.chain
	return req().then((e) => (E.isRight(e) ? LivedoorDataC.decode(e.right) : e));
}

export default InputArea;
