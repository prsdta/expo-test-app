# Weather Expo App

This is the repository for a sample app made with [Expo](https://expo.io/).

It's main purpose is to show the latest weather forecast for a given city (in
Japan), using [Livedoor's Public
API](http://weather.livedoor.com/weather_hacks/webservice).

## Usage

You will need Node.js > 10 with npm installed on your path.

```sh
npm install
```

Then, depending on where you want to try the app: 

``` sh
npm run
# or
npm run android
# or
npm run ios
```

Refer to the Expo
[documentation](https://docs.expo.io/get-started/installation/#2-mobile-app-expo-client-for-ios)
about running the app on your mobile devices.

## Other commands for developement purposes

### Tests

Run the tests (optionaly in watch mode).
``` sh
npx jest src [--watch -o]
```

### Static list of cities

Fetch the list of cities available: the API's website gives a static list of the
available cities to query the weather for at [this
URL](http://weather.livedoor.com/forecast/rss/primary_area.xml). Save this xml
file to `./primary_area.xml` and run the `parseCities.js` script with node.js,
as explained in it's comments.

This operation is manual and done at dev time since the list of cities in
unlikely to change often.

## Backlog

List of features still missing, that would be nice to have:

- [ ] Autocompletion/Dropdown on the search field (prioritizing the previously
      entered cities)
- [ ] Spinner while fetching the data
- [ ] Animation when loading the data
- [ ] Offline data caching

