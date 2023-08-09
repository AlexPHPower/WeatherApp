import {Head, Link} from '@inertiajs/react';
import Layout from '@/Layouts/Layout.jsx';
import {useState} from 'react';
import WeatherCard from './Weather/WeatherCard';
import {weatherService} from './Weather/WeatherService';

export default function Welcome({auth}) {
    const [searchLocation, setSearchLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);

    const handleSearch = async () => {
        setError(null);
        setIsLoading(true);

        try {
            const {
                weatherData: fetchedWeatherData,
                lat: fetchedLat,
                lng: fetchedLng
            } = await weatherService(searchLocation);

            setIsLoading(false);
            setSearchLocation(searchLocation);
            setWeatherData(fetchedWeatherData);
            setLat(fetchedLat);
            setLng(fetchedLng);
        } catch (err) {
            setError('Error fetching location data or weather data. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <Layout
            user={auth.user}
        >
            <Head title="Welcome"/>
            <div
                className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">

                <div className="w-full max-w-7xl p-6 bg-white rounded-lg">
                    <h1 className="text-2xl font-semibold mb-4">Weather App</h1>
                    <div className="flex">
                        <input
                            type="text"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            placeholder="Search location"
                            className="w-full px-4 py-2 rounded-l-md shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 rounded-r-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Loading...' : 'Search'}
                        </button>
                    </div>

                    {weatherData && weatherData.length > 0 && (
                        <WeatherCard
                            weatherData={weatherData}
                            auth={auth}
                            searchLocation={searchLocation}
                            lat={lat}
                            lng={lng}
                        />
                    )}
                </div>
            </div>

            <style>{`
                .bg-dots-darker {
                    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
                }
                @media (prefers-color-scheme: dark) {
                    .dark\\:bg-dots-lighter {
                        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
                    }
                }
            `}</style>
        </Layout>
    );
}
