import { useState, useEffect } from 'react'
import {fromLatLng, setKey} from 'react-geocode'
import Header from './Header.jsx'
import HighlightWidget from './HighlightWidget.jsx'
import WeatherCard from './WeatherCard.jsx'
import WeatherForecast from './WeatherForecast.jsx'
import ProConDash from './ProConDash.jsx'
import HeatMap from './HeatMap.jsx'
import Footer from './Footer.jsx'
import './index.css'

import Atmospheric from './assets/images/atmosphere.png'
import Cloudy from './assets/images/cloudy.png'
import PartialCloudy from './assets/images/partialCloudy.png'
import Rainy from './assets/images/rainy.png'
import Snowy from './assets/images/snowy.png'
import Stormy from './assets/images/stormy.png'
import Sunny from './assets/images/sunny.png'
import Windy from './assets/images/windy.png'

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

    const images = [
        { id: 1, url: Atmospheric, label: 'Atmospheric' },
        { id: 2, url: Cloudy, label: 'Cloudy' },
        { id: 3, url: PartialCloudy, label: 'Partial Cloudy' },
        { id: 4, url: Rainy, label: 'Rainy' },
        { id: 5, url: Snowy, label: 'Snowy' },
        { id: 6, url: Stormy, label: 'Stormy' },
        { id: 7, url: Sunny, label: 'Sunny' },
        { id: 8, url: Windy, label: 'Windy' },
        // Add more images as needed
    ];

    const [curLocation, setCurLocation] = useState({lat: 0.0, lng: 0.0, name: "unknown"})
    const [curWeather, setCurWeather] = useState(defaultWeather)
    const [forecastWeather, setForecastWeather] = useState([defaultWeather, defaultWeather2])

    const [conditions, setConditions] = useState([defaultConditionTemp, defaultConditionUV, defaultConditionHumid])

    function idToWeatherString(weatherId) {
        // Lets switch to determine what id case we hit
        switch (true) {
            case (weatherId >= 200 && weatherId < 300): // This is the ID range for a thunder storm
                return "Stormy"; // Return the associated string
            case (weatherId >= 300 && weatherId < 400): // This is the ID range for a drizzle
                return "Rainy"; // Return the associated string
            case (weatherId >= 500 && weatherId < 600): // This is the ID range for a heavy rain
                return "Rainy"; // Return the associated string
            case (weatherId >= 600 && weatherId < 700): // This is the ID range for a snow storm
                return "Snowy"; // Return the associated string
            case (weatherId >= 700 && weatherId < 800): // This is the ID range for an atmospheric event
                return "Atmospheric"; // Return the associated string
            case (weatherId === 800): // This is the exact ID for clear weather
                return "Sunny"; // Return the associated string
            case (weatherId === 801 || weatherId === 802): // This is the ID range for partial clouds
                return "Partial Cloudy"; // Return the associated string
            case (weatherId === 803 || weatherId === 804): // This is the ID range for clouds
                return "Cloudy"; // Return the associated string
            default: // Any other weather condition should be flagged as atmospheric as its either that or invalid
                return "Atmospheric";
        }
    }

    function getLatLng() {
        var lat, lng
        return new Promise((resolve, reject) => {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) =>{
                    lat = position.coords.latitude
                    lng = position.coords.longitude
                    resolve({lat: lat, lng: lng})
                },(e) => {
                    resolve({lat: 32.7767, lng: -96.7970})
                })
            }
            else {
                resolve({lat: 32.7767, lng: -96.7970})
            }
        })
        
    }

    useEffect(() => {
        console.log(curLocation)
    }, [curLocation])

    async function getLocationGeocode() {
        let results;

        const loc = await getLatLng()
        const geo = await fromLatLng(loc.lat, loc.lng)
        if (geo.status !== "OK"){
            setCurLocation({lat: 32.7767, lng: -96.7970, name: "Dallas, TX"})
        }else{
            ({results} = geo)
            setCurLocation({lat: loc.lat, lng: loc.lng, name: results[0].formatted_address})
        }
    }

    async function getWeathers() {
        const curWeatherResponse = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${curLocation.lat}&lon=${curLocation.lng}&exclude=minutely,hourly,daily,alerts&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
        if(curWeatherResponse.statusText !== "OK")
            setCurWeather({
                weatherImg: "https://via.placeholder.com/100",
                high: 0,
                low: 0,
                feelsLike: 0,
                UV: 0,
                humid: 0,
                weatherCon: "null"
            })
        else {
            let {current} = await curWeatherResponse.json()
            setCurWeather({
                weatherImg: images.find(img => img.label === idToWeatherString(current.weather[0].id)).url,
                high: NaN,
                low: NaN,
                feelsLike: (((current.feels_like - 273.15) * (9/5)) + 32).toFixed(2),
                UV: current.uvi,
                humid: current.humidity,
                weatherCon: current.weather[0].main
            })
        }

        const forecastWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${curLocation.lat}&lon=${curLocation.lng}&cnt=4&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
        
        if(curWeatherResponse.statusText !== "OK")
            setForecastWeather([curWeather, curWeather, curWeather, curWeather])
        else {
            let {list} = await forecastWeatherResponse.json()
            setForecastWeather(list.map(datem => {return {
                weatherImg: images.find(img => img.label === idToWeatherString(datem.weather[0].id)).url,
                high: ((datem.temp.max * (9/5)) + 32).toFixed(2),
                low: ((datem.temp.min * (9/5)) + 32).toFixed(2),
                feelsLike: NaN,
                UV: NaN,
                humid: datem.humidity,
                weatherCon: datem.weather[0].main
            }
            }))
        }
    }

    useEffect(() => {
        try{
            if(curWeather.name === "unknown")
                throw new Error("Waiting for geocode")
            getWeathers()
        }
        catch(error){
            console.log(error)
            setCurWeather({
                weatherImg: "https://via.placeholder.com/100",
                high: 0,
                low: 0,
                feelsLike: 0,
                UV: 0,
                humid: 0,
                weatherCon: "null"
            })

        }
    }, [curLocation])

    useEffect(() =>{
        setKey(import.meta.env.VITE_GEOCODE_API_KEY);
        try{
            getLocationGeocode()
        }
        catch(error){
            console.log(error)
        }
    },[])

    return (
        <>
            <Header location={curLocation} setLocation={setCurLocation}/>
            <div>
                <h1>Today:</h1>
                <WeatherCard dayOfWeek="" forecated={false} weather={curWeather}/>
            </div>
 
            <WeatherForecast forecastWeather={forecastWeather}/>
            <hr />
 
            <HighlightWidget conditions={conditions}/>
            <hr />
            <ProConDash conditions={conditions}/>
            <hr />
            <Footer/>
        </>
    )
}

export default App
