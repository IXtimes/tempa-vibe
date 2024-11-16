

export default function WeatherCard(props) {
    return (
        <div>
            <h3>{props.dayOfWeek}</h3>
            <img src={props.weather.weatherImg} alt="Weather Image"/>
            {props.forecasted ? 
                    <p>H: {props.weather.high}°{props.isFah ? "F " : "C "} 
                    L: {props.weather.low}°{props.isFah ? "F" : "C"}</p> : 
                    <p>{props.weather.feelsLike}°{props.isFah ? "F" : "C"}</p>}
            <p>UV: {props.weather.UV}</p>
            <p>Humid: {props.weather.humid}</p>
            <p>{props.weather.weatherCon}</p>
        </div>
    )
}

WeatherCard.defaultProps = {
    weather: {
        weatherImg: "https://via.placeholder.com/150",
        high: 0,
        low: 0,
        feelsLike: 0,
        UV: 0,
        humid: 0,
        weatherCon: "null"
    },
    dayOfWeek: "Null",
    forecasted: false
}