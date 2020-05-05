import * as t from "io-ts";
import { DateFromString, URLFromString } from "./utils";

export type DayLabel = t.TypeOf<typeof DayLabelC>;
const DayLabelC = t.union(
	[t.literal("今日"), t.literal("明日"), t.literal("明後日")],
	"DayLabel"
);

export type Location = t.TypeOf<typeof LocationC>;
const LocationC = t.type({
	city: t.string,
	area: t.string,
	prefecture: t.string,
});

const DescriptionC = t.type({
	/** 天気概況文 */
	text: t.string,
	/** 天気概況文の発表時刻 */
	publicTime: DateFromString,
});

export type ImageData = t.TypeOf<typeof ImageDataC>;
const ImageDataC = t.type({
	width: t.Int,
	height: t.Int,
	url: URLFromString,
	title: t.string,
});

/**
 * TODO improve with a branded type? Since these are not served as numbers, it
 * would be safer to parse them *
 */
export type Temperature = t.TypeOf<typeof TemperatureC>;
const TemperatureC = t.type({
	celsius: t.string,
	fahrenheit: t.string,
});

export type Temperatures = t.TypeOf<typeof TemperaturesC>;
const TemperaturesC = t.type({
	min: t.union([TemperatureC, t.null]),
	max: t.union([TemperatureC, t.null]),
});

export type Forecast = t.TypeOf<typeof ForecastC>;
const ForecastC = t.type({
	/** ↓ Actual weather prediction */
	telop: t.string,
	temperature: TemperaturesC,

	dateLabel: DayLabelC,
	date: DateFromString,
	image: ImageDataC,
});

export type LivedoorData = t.TypeOf<typeof LivedoorDataC>;

/** Decoder for the expected data from the endpoint,
 * Determined using http://weather.livedoor.com/weather_hacks/webservice
 */
const LivedoorDataC = t.type({
	/** 予報の発表日時 */
	publicTime: DateFromString,
	title: t.string,
	link: URLFromString,
	forecasts: t.array(ForecastC, "Forecasts"),
	description: DescriptionC,
	location: LocationC,
});

export default LivedoorDataC;
