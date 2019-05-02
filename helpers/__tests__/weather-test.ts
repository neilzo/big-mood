import { computeOverallWeather, kelvinToFarenheit } from '../weather';

const sampleResponse = {
  coord: {
    lon: -73.99,
    lat: 40.73,
  },
  weather: [
    {
      id: 500,
      main: 'Rain',
      description: 'light rain',
      icon: '10d',
    },
    {
      id: 701,
      main: 'Mist',
      description: 'mist',
      icon: '50d',
    },
  ],
  base: 'stations',
  main: {
    temp: 282.5,
    pressure: 1003,
    humidity: 87,
    temp_min: 280.15,
    temp_max: 284.82,
  },
  visibility: 11265,
  wind: {
    speed: 3.6,
    deg: 160,
  },
  rain: {
    '1h': 0.25,
  },
  clouds: {
    all: 90,
  },
  dt: 1554839356,
  sys: {
    type: 1,
    id: 4686,
    message: 0.0088,
    country: 'US',
    sunrise: 1554805602,
    sunset: 1554852482,
  },
  id: 5128581,
  name: 'New York',
  cod: 200,
};

describe('Weather Helpers', () => {
  describe('kelvinToFarenheit', () => {
    it('should convert K to F', () => {
      expect(kelvinToFarenheit(sampleResponse.main.temp)).toBe(49);
    });
  });

  describe('computeOverallWeather', () => {
    expect(computeOverallWeather(sampleResponse)).toEqual({
      description: 'Rain',
      icon: '10d',
      temperature: 49,
    });
  });
});
