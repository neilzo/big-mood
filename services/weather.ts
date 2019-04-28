import { OPEN_WEATHER_MAP_API_KEY } from '../config';
import { computeOverallWeather } from '../helpers/weather';

const getCurrentWeather = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=New+York,US&appid=${OPEN_WEATHER_MAP_API_KEY}`,
    {
      method: 'GET',
    }
  )
    .then(res => res.json())
    .then(resJson => computeOverallWeather(resJson));
};

export { getCurrentWeather };
