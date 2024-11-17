import { useState, useEffect } from 'react'
import Header from './Header.jsx'
import HighlightWidget from './HighlightWidget.jsx'
import WeatherCard from './WeatherCard.jsx'
import WeatherForecast from './WeatherForecast.jsx'
import ProConDash from './ProConDash.jsx'
import HeatMap from './HeatMap.jsx'
import Footer from './Footer.jsx'
import './index.css'

function App() {
    const defaultWeather = {
        weatherImg: "https://via.placeholder.com/100",
        high: 0,
        low: 0,
        feelsLike: 0,
        UV: 0,
        humid: 0,
        weatherCon: "null"
    };
    const defaultWeather2 = {
        weatherImg: "https://via.placeholder.com/100",
        high: 0,
        low: 0,
        feelsLike: 0,
        UV: 0,
        humid: 0,
        weatherCon: "null"
    };
    const defaultConditionTemp = {
        condition: "Undefined condition",
        type: "Temp" ,
        eval: "Pro"
    };
    const defaultConditionUV = {
        condition: "Undefined condition",
        type: "UV" ,
        eval: "Neutral"
    };
    const defaultConditionHumid = {
        condition: "Undefined condition",
        type: "Humid" ,                           
        eval: "Con"
    };

    const [curLocation, setCurLocation] = useState({lat: 0.0, lng: 0.0, name: "unknown"})
    const [curWeather, setCurWeather] = useState(defaultWeather)
    const [forecastWeather, setForecastWeather] = useState([defaultWeather, defaultWeather2])

    const [conditions, setConditions] = useState([defaultConditionTemp, defaultConditionUV, defaultConditionHumid])

    return (
        <>
            <Header location={curLocation} setLocation={setCurLocation}/>
            <hr />
            <WeatherForecast forecastWeather={forecastWeather}/>
            <hr />
            <div>
                <h1>Today:</h1>
                <WeatherCard dayOfWeek="" forecated={false} weather={curWeather}/>
            </div>
            <hr />
            <HighlightWidget conditions={conditions}/>
            <hr />
            <ProConDash conditions={conditions}/>
            <hr />
            <HeatMap location={curLocation}/>
            <hr />
            <Footer/>
        </>
    )
}

export default App
