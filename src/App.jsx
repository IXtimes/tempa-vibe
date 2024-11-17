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

    const [curLocation, setCurLocation] = useState(null)
    const [curWeather, setCurWeather] = useState(null)
    const [forecastWeather, setForecastWeather] = useState([])

    const [conditions, setConditions] = useState([])

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
        if(curWeather)
            collateConditions();
    }, [curWeather])

    function collateConditions() {
        var cons = [];
        var time = new Date().getHours();
        
        // Evaluate temperature conditions
        if(curWeather.feelsLike <= 20) {
            cons.push({condition: "It is very cold out! You need to wear lots of clothes to keep warm!", level: "Danger"})
            cons.push({condition: "Extreme cold temperatures like these can lead to frostbite and hypothermia, so avoid staying out for long periods of time", level: "Danger"})
        }
        if(curWeather.feelsLike <= 32)
            cons.push({condition: "Below-freezing temperatures can lead to ice, making walkways and roadways slick! Walk with caution.", level: "Danger"})
        if(curWeather.feelsLike > 32 && curWeather.feelsLike <= 50)
            cons.push({condition: "The temperature indicates chilly conditions where some additional clothing is necessary. ", level: "Warning"})
        if(curWeather.feelsLike > 50 && curWeather.feelsLike <= 85)
            cons.push({condition: "Fair temperature conditions indicate no need to be concerned with how to dress", level: "Info"})
        if(curWeather.feelsLike > 85 && curWeather.feelsLike <= 100) {
            cons.push({condition: "High temperatures incentivize wearing light, loose, breathable clothing!", level: "Warning"})
            cons.push({condition: "Hot conditions can dehydrate you faster than normal, make sure to drink plenty of water", level: "Warning"})
            if(time > 11 && time < 16)
                cons.push({condition: "Its peak temperature out right now, avoid strenuous activities", level: "Warning"})
        }
        if(curWeather.feelsLike > 100) {
            cons.push({condition: "Temperature is extremely high! Avoid outdoor activities and stay in the air-conditioned areas", level: "Danger"})
            cons.push({condition: "Avoid staying out for long periods, and watch for signs of illness due to excessive heat exposure.", level: "Danger"})
        }

        // Evaluate UV conditions
        if(curWeather.UV <= 2)
            cons.push({condition: "UV levels are at a negligible range right now.", level: "Info"})
        if(curWeather.UV > 2 && curWeather.UV <= 5) {
            cons.push({condition: "UV levels are slightly high, consider clothing that provides shade and applying sunscreen before going out.", level: "Info"})
            if(time > 12 && time < 14)
                cons.push({condition: "UV levels are more intense right now, avoid direct sun exposure as much as possible", level: "Warning"})
        } if(curWeather.UV > 5 && curWeather.UV <= 7) {
            cons.push({condition: "UV levels are high, wear protective clothing and apply sunscreen every two hours if going outside", level: "Warning"})
            if(time > 10 && time < 16)
                cons.push({condition: "UV levels are at their peak for the day, avoid sun exposure!", level: "Danger"})
        } if(curWeather.UV > 7 && curWeather.UV <= 10)
            cons.push({condition: "UV levels are very high, minimize outdoor exposure and prioritize UV-protective clothing and eye protection if going out.", level: "Danger"})
        if(curWeather.UV > 10)
            cons.push({condition: "UV levels are extremely high. Avoid going outside unless necessary or wear maximum UV protection. Sensitive individuals should NOT expose themselves to sunlight.", level: "Danger"})

        // Evaluate humidity conditions
        if(curWeather.humid <= 20)
            cons.push({condition: "Conditions are dry out right now, attempt to stay hydrated as much as possible.", level: "Warning"})
        if(curWeather.humid > 20 && curWeather.humid <= 60)
            cons.push({condition: "Outdoor humidity is tolerable for average wear and activity", level: "Info"})
        if(curWeather.humid > 60 && curWeather.humid <= 80)
            cons.push({condition: "Conditions are slightly humid, be aware of participating in intense physical activities.", level: "Info"})
        if(curWeather.humid > 80)
            cons.push({condition: "Conditions are very humid right now, avoid strenuous activities and wear breathable clothing", level: "Warning"})
        
        setConditions(cons)
    }

    useEffect(() => {
        try{
            if(curLocation !== null)
                getWeathers();
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
            <div className="blur"></div>
            
            {/* Header */}
            <header>
                <div style={{ display: "flex", flexDirection: "row"}}>
                    {curLocation && <Header location={curLocation} setLocation={setCurLocation} />}
                </div>
                
                
            </header>
            <div className='alerts'>
                    {conditions && <ProConDash conditions={conditions} />}
                </div>


            
            <div style={{margin: '30px 0px', display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
                <div>
                    {curWeather && <WeatherCard dayOfWeek="" forecasted={false} weather={curWeather} />}
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignContent: "center", justifyContent: "center" }}>
                    {forecastWeather && <WeatherForecast forecastWeather={forecastWeather} />}
                </div>
            </div>
            

            

            {/* Footer */}
            <div style={{ bottom: 0, left: 0, width: "100vw", backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white", textAlign: "center", padding: "10px 0", zIndex: 1 }}>
                <Footer />
            </div>
        </>
    )
}

export default App
