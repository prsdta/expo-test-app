// jest.config.js
module.exports = {
	verbose: true,
	// FIXME Some selectors like getByText are broken, but neither preset expo nor
	// react-native (from testing-librairy) seem to work.
	preset: "react-native",
	transformIgnorePatterns: [
		"node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)"
	]
};
