import * as React from "react";
import {
	render,
	act,
	fireEvent,
	cleanup,
	wait,
	getByText,
} from "@testing-library/react-native";

import InputArea, { labels } from "./InputArea";
import { AppStateProvider } from "../reducers/useAppState";

const testData = {
	city: "東京",
};

function renderHelper() {
	return render(
		<AppStateProvider>
			<InputArea />
		</AppStateProvider>
	);
}

afterEach(() => cleanup());

describe("City Name Input", () => {
	it("Renders an input", () => {
		const { getByLabelText, getByRole } = renderHelper();

		const input = getByLabelText(labels.inputAccessibilityLabel);
		expect(input.type).toBe("TextInput");

		// verify it has a submit button
		getByRole("button");

		// verify the value is correctly updating
		act(() => {
			fireEvent.changeText(input, testData.city);
		});
		expect(input.getProp("value")).toBe(testData.city);
	});

	it("Render an error message", () => {
		const {
			getByLabelText,
			getByRole,
			getByTestId,
			findByText, // because getByText is broken
		} = renderHelper();
		const input = getByLabelText(labels.inputAccessibilityLabel);
		const helper = getByTestId(labels.inputErrorTestID);
		const button = getByRole("button");

		expect(helper.children[0]).toStrictEqual("");

		act(() => {
			fireEvent.changeText(input, "hogehoge"); // fake city
			fireEvent.press(button);
		});
		expect(findByText(labels.cityNotFound)).toBeTruthy();
	});

	it("Gets data from a city", async () => {
		const { getByLabelText, getByRole, getByTestId } = renderHelper();
		const input = getByLabelText(labels.inputAccessibilityLabel);
		const button = getByRole("button");

		act(() => {
			fireEvent.changeText(input, "鹿児島");
		});

		await wait(() => {
			act(() => {
				fireEvent.press(button);
			});
		});
		const helper = getByTestId(labels.inputErrorTestID);
		expect(helper.children[0]).toStrictEqual("");
	});
});
