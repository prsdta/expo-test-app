import * as React from "react";
import { StyleSheet, View } from "react-native";

import { useAppContext } from "../reducers/useAppState";

interface PropsType {
	children: {
		top: JSX.Element;
		bottom: JSX.Element;
	};
}

/**
 * Utility component to wrap with styles the element.
 * Changes the size of its children depending on the state
 *
 * TODO Used an object as children, but it could look cleaner by just taking
 * the 1st and 2nd element of the children array?
 */
const MainLayout = ({ children }: PropsType) => {
	const [state] = useAppContext();

	const hasDataP: <T>(v: T) => T | null = (v) =>
		state.externalData !== null ? v : null;

	const topStyles = {
		...styles.top,
		...styles.center,
		...hasDataP(styles.topActive),
	};
	const bottomStyles = {
		...styles.bottom,
		...styles.center,
		...hasDataP(styles.bottomActive),
	};

	return (
		<View style={{ ...styles.container, ...styles.center }}>
			<View style={topStyles}>{children.top}</View>
			<View style={bottomStyles}>{children.bottom}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		width: "100%",
		marginTop: 30, // some space for the system bar
	},
	center: {
		alignItems: "stretch",
		justifyContent: "center",
	},
	top: {
		flex: 1,
		height: "100%",
	},
	bottom: { flex: 0 },
	topActive: { flex: 1 },
	bottomActive: { flex: 2 },
});

export default MainLayout;
