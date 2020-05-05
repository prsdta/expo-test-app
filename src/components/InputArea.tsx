import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
	TextInput,
	HelperText,
	Button,
	DefaultTheme,
} from "react-native-paper";

/**
 * Duo of an input and a submit button for the user to enter the desired place.
 *
 * FIXME add a submit callback via props
 * TODO add a onChange callback for an autocompletion?
 *
 */
const InputArea = (props: any) => {
	const [place, setPlace] = useState("");
	return (
		<View style={styles.inputGroup}>
			<TextInput
				style={styles.input}
				label="地方名"
				value={place}
				onChangeText={setPlace}
			/>
			<Button style={styles.button} mode="outlined">
				調べる
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
	inputGroup: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "stretch",
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

export default InputArea;
