import React, { useState } from 'react'
import axios from 'axios'

function App() {

  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=json`);
        const { lat, lon } = response.data[0];
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=6a2aa1bf104e28b7f4b4b683837f17c6`);
        setData(weatherResponse.data);
      } catch (error) {
        console.error(error);
      }
      setLocation('');
    }
  };

  // const getIconUrl = (iconCode) => `http://openweathermap.org/img/w/${iconCode}.png`;

  return (
    <div className="app">
      <div className="search">
        <input
          type="text"
          placeholder='Search city'
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}

        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}

          </div>
          <div className="temperature-container">
            <div className="tempmin">
              {data.main ? <h3>{data.main.temp_min.toFixed()}°C</h3> : null}
            </div>
            <div className="slash">
              {data.main ? <h3>/</h3> : null}
            </div>
            <div className="tempmax">
              {data.main ? <h3>{data.main.temp_max.toFixed()}°C</h3> : null}
            </div>
          </div>


          <div className="description">
            {data.weather ? <p>{data.weather[0].description}</p> : null}
            {/* <img src={getIconUrl(data.weather[0].icon)} alt={data.weather[0].main} /> */}

          </div>
        </div>
      </div>

      {data.name !== undefined &&//dont wanna see the bottom 3 until location is not put
        <aside>
          <div className="side">

            <div className="disp">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div><br></br><br></br>

            <div className="disp">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div><br></br><br></br>

            <div className="disp">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}

              <p>Wind Speed</p>
            </div><br></br><br></br>

          </div>

        </aside>

      }
    </div>
  );
}

export default App;
