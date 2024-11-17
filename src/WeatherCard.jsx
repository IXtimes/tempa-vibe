

export default function WeatherCard(props) {
    return (
        <div>
            <h3>{props.dayOfWeek}</h3>
            <img src={props.weather.weatherImg} alt="Weather Image"/>
            {props.forecasted ? 
                    <p>H: {props.weather.high}°F 
                    L: {props.weather.low}°F </p> : 
                    <p>{props.weather.feelsLike}°F </p>}
            {!props.forecasted && <p>UV: {props.weather.UV}</p>}
            <p>Humid: {props.weather.humid}%</p>
            <p>{props.weather.weatherCon}</p>
        </div>
    )
}
