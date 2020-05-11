import React from "react";
import { StyleSheet, View } from "react-native";
import InputArea from "./src/components/InputArea";
import { Provider as PaperProvider, Title } from "react-native-paper";
import { AppStateProvider } from "./src/reducers/useAppState";
import Results from "./src/components/Results";
import MainLayout from "./src/layouts/MainLayout";

export default function App() {
	return (
		<AppStateProvider>
			<PaperProvider>
				<MainLayout>
					{{
						top: (
							<>
								<Title style={styles.title}>
									天気予報を見るためのアプリです。
								</Title>
								<InputArea />
							</>
						),
						bottom: <Results />,
					}}
				</MainLayout>
			</PaperProvider>
		</AppStateProvider>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "700",
		color: "#333",
		margin: 16,
	},
});
