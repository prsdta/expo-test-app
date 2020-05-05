const { promises } = require("fs");
const { parseStringPromise } = require("xml2js");

const FILENAME = "./primary_area.xml";

/**
 * Basic script to parse the cities xml and output it to the console as JSON
 * data.
 * 
 * Possible improvements:
 * TODO take filename from commandline args or data source from pipe
 * 
 * @example 
 * ```
 * $ node parseCities.js > src/citiesData.json
 * ```
 * 
 * */
const task = promises
	.readFile(FILENAME)
	.then((v) => parseStringPromise(v))
	.then((v) => {
		const prefs = v.rss.channel[0]["ldWeather:source"][0].pref;
		return prefs.map((pref) => {
			return {
				name: pref["$"].title,
				cities: pref.city.map((city) => city["$"]),
			};
		});
	});

task.then((prefs) => console.log(JSON.stringify(prefs), null, "\t"));
