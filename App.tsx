import React from "react";
import { StyleSheet, View } from "react-native";
import InputArea from "./src/components/InputArea";
import { Provider as PaperProvider, Title } from "react-native-paper";
import { AppStateProvider } from "./src/reducers/useAppState";

export default function App() {
	return (
		<AppStateProvider>
			<PaperProvider>
				<View style={{ height: "100%", width: "100%" }}>
					<View style={styles.container}>
						<Title style={styles.title}>天気予報を見るためのアプリです。</Title>
						<InputArea />
					</View>
				</View>
			</PaperProvider>
		</AppStateProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		fontSize: 20,
		fontWeight: "700",
		color: "#333",
		margin: 16,
	},
});
