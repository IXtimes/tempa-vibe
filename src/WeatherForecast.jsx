import WeatherCard from "./WeatherCard.jsx";

export default function WeatherForecast(props) {
    function getDayOfWeek (offset) {
        switch((new Date().getDay() + offset) % 7) {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
        }
    }

    return(
        <div>
            <ul>
                {props.forecastWeather.map((weather, i) => 
                <li key={i}><WeatherCard dayOfWeek={getDayOfWeek(i + 1)} forecasted={true} weather={weather}/></li>)}
            </ul>
        </div>
    )
}