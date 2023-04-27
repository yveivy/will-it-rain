api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

// **Hint**: Using the 5 Day Weather Forecast API, you'll notice that you will need to pass in coordinates instead of just a city name. Using the OpenWeatherMap APIs, how could we retrieve geographical coordinates given a city name?

// Required Parameters
// lat, lon	required	Geographical coordinates (latitude, longitude). If you need the geocoder to automatic convert city names and zip-codes to geo coordinates and the other way around, please use our Geocoding API.

// appid	required	Your unique API key (you can always find it on your account page under the "API key" tab)

// Optional Parameters

// units	optional	Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

// mode	optional	Response format. JSON format is used by default. To get data in XML format use mode=xml. Learn more

// cnt	optional	A number of timestamps, which will be returned in the API response. Learn more

// units	optional	Units of measurement. standard, metric and imperial units are available. If you do not use the units parameter, standard units will be applied by default. Learn more

// lang	optional	You can use the lang parameter to get the output in your language. Learn more

// Second API call to Geocoder converts city names and zip-codes to geo coordinates. Please note that built-in geocoder has been deprecated. Although it is still available for use, bug fixing and updates are no longer available for this functionality.

https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// Required Parameters for location API
// q	required	City name, state code (only for the US) and country code divided by comma. Please use ISO 3166 country codes.

// appid	required	Your unique API key (you can always find it on your account page under the "API key" tab)

// Daily Forecast Weather API response

