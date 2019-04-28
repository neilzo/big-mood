interface WeatherResults {
  weather: Array<{ main: string; icon: string }>;
  main: {
    temp: number;
  };
}

const kelvinToFarenheit = (kelvin: number) => {
  return Math.round(kelvin * (9 / 5) - 459.76);
};

const computeOverallWeather = (weatherResults: WeatherResults) => ({
  icon: weatherResults.weather[0].icon,
  description: weatherResults.weather[0].main,
  temperature: kelvinToFarenheit(weatherResults.main.temp),
});

export { kelvinToFarenheit, computeOverallWeather };
