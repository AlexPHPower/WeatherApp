export const getPrecipitationType = (precipitation) => {
    if (precipitation < 0.5) return 'Slight';
    if (precipitation <= 4) return 'Moderate';
    return 'Heavy';
};

export const getWindType = (windSpeed) => {
    if (windSpeed < 0.5) return 'Calm';
    if (windSpeed <= 5) return 'Light Breeze';
    if (windSpeed <= 10) return 'Moderate';
    return 'Strong Breeze';
};

export const getCloudCoverageType = (cloudCover) => {
    if (cloudCover = 0) return 'Clear/Sunny';
    if (cloudCover < 1 / 8) return 'Clear/Sunny';
    if (cloudCover < 3 / 8) return 'Mostly Clear';
    if (cloudCover < 5 / 8) return 'Partly Cloudy';
    if (cloudCover < 7 / 8) return 'Mostly Cloudy';
    return 'Cloudy';
};

export const getWeatherIcon = (cloudCover, precipitation) => {
    if (cloudCover === 'Clear/Sunny') {
        return <i className="fas fa-sun text-yellow-500"></i>;
    } else if (cloudCover.includes('Clear') || cloudCover.includes('Partly Cloudy')) {
        if (precipitation === 'Slight') {
            return <i className="fas fa-sun text-yellow-500"></i>; // Display sun when mostly clear with slight precipitation
        } else {
            return <i className="fas fa-cloud-showers-heavy text-gray-600"></i>; // Display heavy rain icon when not slight precipitation
        }
    } else if (cloudCover.includes('Cloudy')) {
        if (precipitation === 'Slight') {
            return <i className="fas fa-cloud text-gray-600"></i>; // Display cloud icon when cloudy with slight precipitation
        } else {
            return <i className="fas fa-cloud-rain text-gray-600"></i>; // Display rain icon when not slight precipitation
        }
    } else {
        return <i className="fas fa-question text-gray-600"></i>; // Display question mark icon for unknown conditions
    }
};

export const getAMPM = (time) => {
    const hour = parseInt(time.split(':')[0], 10);
    return hour >= 12 ? 'pm' : 'am';
};
