import axios from 'axios';
import { getPrecipitationType, getWindType, getCloudCoverageType } from './WeatherUtils';

export const weatherService = async (searchLocation) => {
    const today = new Date().toISOString().split('T')[0];
    const cacheKey = `weather_${searchLocation}_${today}`;

    // Check if cached data exists
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        return JSON.parse(cachedData);
    }

    try {
        const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
                q: searchLocation,
                key: import.meta.env.VITE_OPENCAGE_API_KEY,
            },
        });

        const { lat, lng } = response.data.results[0].geometry;

        const params = 'waveHeight,airTemperature,windSpeed,precipitation,cloudCover';
        const stormGlassApiKey = import.meta.env.VITE_STORM_GLASS_API_KEY;
        const weatherResponse = await fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}`, {
            headers: {
                'Authorization': stormGlassApiKey,
            },
        });

        const weatherDataFromStormGlass = await weatherResponse.json();

        const formattedWeatherData = weatherDataFromStormGlass.hours.filter((hourData) => {
            return hourData.time.startsWith(today);
        }).map((hourData) => ({
            time: hourData.time.split('T')[1].substring(0, 5),
            waveHeight: hourData.waveHeight ? hourData.waveHeight.noaa : null,
            airTemperature: hourData.airTemperature ? hourData.airTemperature.sg : null,
            precipitation: getPrecipitationType(hourData.precipitation ? hourData.precipitation.sg : null),
            windSpeed: getWindType(hourData.windSpeed ? hourData.windSpeed.sg : null),
            cloudCover: getCloudCoverageType(hourData.cloudCover ? hourData.cloudCover.sg : null),
        }));


        // Cache the formatted weather data
        const weatherDataToCache = {
            weatherData: formattedWeatherData,
            lat,
            lng,
            searchLocation,
        };

        // Store in local storage as cache
        localStorage.setItem(cacheKey, JSON.stringify(weatherDataToCache));

        return weatherDataToCache;
    } catch (err) {
        console.log(err);
        throw new Error('Error fetching location data or weather data. Please try again.');
    }
};
