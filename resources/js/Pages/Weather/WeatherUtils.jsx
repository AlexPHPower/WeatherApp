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

export const getCloudCoverageType = (cloudCoverPercentage) => {
    if (cloudCoverPercentage < 12.5) return 'Clear/Sunny';
    if (cloudCoverPercentage < 37.5) return 'Mostly Clear';
    if (cloudCoverPercentage < 62.5) return 'Partly Cloudy';
    if (cloudCoverPercentage < 87.5) return 'Mostly Cloudy';
    return 'Cloudy';
};

export const getWeatherIcon = (cloudCover, precipitation) => {
    if (cloudCover === 'Clear/Sunny') {
        return <i className="fas fa-sun text-yellow-500"></i>;
    } else if (cloudCover.includes('Clear') || cloudCover.includes('Partly Cloudy')) {
        if (precipitation === 'Slight') {
            return <i className="fas fa-cloud text-gray-600"></i>;
        } else {
            return <i className="fas fa-cloud-showers-heavy text-gray-600"></i>;
        }
    } else if (cloudCover.includes('Cloudy')) {
        if (precipitation === 'Slight') {
            return <i className="fas fa-cloud text-gray-600"></i>;
        } else {
            return <i className="fas fa-cloud-rain text-gray-600"></i>;
        }
    } else {
        return <i className="fas fa-question text-gray-600"></i>;
    }
};

export const getAMPM = (time) => {
    const hour = parseInt(time.split(':')[0], 10);
    return hour >= 12 ? 'pm' : 'am';
};
