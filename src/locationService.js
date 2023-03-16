// locationService.js
import axios from 'axios';

export const getLocation = async (latitude, longitude, apiKey) => {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        const data = response.data.results[0];
        return data.formatted;
    } catch (error) {
        console.log(error.message);
        return null;
    }
};


