import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weather, setWeather] = useState('');

  const handleCityChange = useCallback( city  => {

    const API_KEY = '49594c78db5894143b7ed090bb3643b8'

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=${API_KEY}&units=metric`)
   .then(res => res.json())
   .then(data => {
     console.log(data);
     const weatherData = {
      city: data.name,
      temp: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].main
      };
      setWeather(weatherData);
   });

  }, []);
  return (
    <section>
      <PickCity action={handleCityChange}/>
      <WeatherSummary {...weather} />
      <Loader />
    </section>
  )
};

export default WeatherBox;