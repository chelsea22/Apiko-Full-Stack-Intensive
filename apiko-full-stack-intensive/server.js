import config from './config';
import fetch from 'node-fetch';

const fahrenheitToCelsius = degree => ((5/9) * (degree - 32)).toPrecision(2)

const getLocation = async (city) => {
	try {
		const response = await fetch(`${config.geoEndpoint}?address=${city}&key=${config.geoKey}`);
		const data = await response.json();
		if (data.status !== 'OK') return;
		const lat = data.results[0].geometry.location.lat;
		const lng = data.results[0].geometry.location.lng;
		return { lat, lng };
	} catch(error) {
		console.error(error);
	}
}

const getWeather = async (location) => {
	if (!location || !location.lat || !location.lng) return;
	try {
		const { lat, lng } = location;
		const response = await fetch(`${config.darkEndpoint}/${config.darkKey}/${lat},${lng}`);
		const weather = await response.json();
		return { currently: weather.currently, daily: weather.daily };
	} catch(error) {
		console.error(error);
	}	
}

const displayInfo = async (city) => {
	if (!city || !city.trim()) { console.log('Please enter city nane after \'npm run dev\' command!'); return; }
	const location = await getLocation(city);
	if (!location) { console.log('Something went wrong (('); return; }
	const info = await getWeather(location);
	if (!info) { console.log('Something went wrong (('); return; }
	const { currently: { temperature, humidity, windSpeed }, daily: { summary } } = info;
	const celsiusTemperature = fahrenheitToCelsius(temperature);
	const celsiusSummary = summary.replace(/\d+/g, (g) => fahrenheitToCelsius(parseFloat(g))).replace('F ', 'C ');
	console.log(`\tCurrently in ${city}\n\ntemperature: ${celsiusTemperature}\nhumidity: ${humidity}\nwind speed: ${windSpeed}\n\nSummary: ${celsiusSummary}`);
}

const city = process.argv[2];
displayInfo(city);
