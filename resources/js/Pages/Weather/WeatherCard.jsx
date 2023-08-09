import React, { useState } from 'react';
import { getWeatherIcon, getAMPM } from './WeatherUtils';

const WeatherCard = ({ weatherData, auth, searchLocation, lat, lng}) => {
    const [saveStatus, setSaveStatus] = useState(null);

    const handleSaveFavorite = async () => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

            const response = await axios.post('/favorites', {
                locationName: searchLocation,
                latitude: lat,
                longitude: lng,
            }, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });

            setSaveStatus('success');
        } catch (error) {
            setSaveStatus('error');
        }
    };

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold">Hourly Weather Forecast for { searchLocation }</h2>
            <div className="grid grid-cols-1 gap-4 mt-2">
                <div className="flex overflow-x-auto space-x-4 p-4">
                    {weatherData.map((hourData, index) => (
                        <div key={index} className="bg-white p-4 rounded-md shadow- flex-shrink-0 w-64">
                            <div className="space-y-2">
                                {getWeatherIcon(hourData.cloudCover, hourData.precipitation)}
                                <p className="font-semibold">Time: {hourData.time} {getAMPM(hourData.time)}</p>
                                <p>Temperature: {hourData.airTemperature} °C</p>
                                <p>Precipitation: {hourData.precipitation}</p>
                                <p>Wind: {hourData.windSpeed}</p>
                                <p>Cloud Coverage: {hourData.cloudCover}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {auth.user && (
                    <div className="flex flex-col items-center mt-2">
                        <button
                            onClick={() => handleSaveFavorite({ name: searchLocation, lat: searchLocation.lat, lng: searchLocation.lng })}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save as Favorite
                        </button>
                        {saveStatus === 'success' && <p className="text-green-500 mt-1">Saved successfully!</p>}
                        {saveStatus === 'error' && <p className="text-red-500 mt-1">An error occurred. Please try again.</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WeatherCard;
