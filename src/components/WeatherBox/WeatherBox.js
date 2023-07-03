import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = props => {

  const [weather, setWeather] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback( city  => {

    const API_KEY = '49594c78db5894143b7ed090bb3643b8'

    setPending(true);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=${API_KEY}&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
          .then(data => {
            setPending(false);
            console.log(data);

            const weatherData = {
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            };

            setWeather(weatherData);

            })

        } else {
         setError(true);
        }
      });

    }, []);
  return (
    <section>
      <PickCity action={handleCityChange}/>
      {( weather && !pending )&& <WeatherSummary {...weather} />}
      { (pending && !error) && <Loader />}
      { error && <ErrorBox>There is no such a city!</ErrorBox>}
    </section>
  )
};

export default WeatherBox;