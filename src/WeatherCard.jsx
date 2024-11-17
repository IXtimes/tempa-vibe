export default function WeatherCard(props) {
    return (
        
        <div className="weatherCard">
            <h3>{props.dayOfWeek}</h3>
            <img className="weatherIcon" src={props.weather.weatherImg} alt="Weather Icon" />
            <section className="weatherStats">
                {props.forecasted ? 
                    <p>H: {props.weather.high}°F <br />
                    L: {props.weather.low}°F</p> : 
                    <p>{props.weather.feelsLike}°F</p>}
                {!props.forecasted && <p>UV: {props.weather.UV}</p>}
                <p>Humid: {props.weather.humid}%</p>
                <p>{props.weather.weatherCon}</p>
            </section>
        </div>
    );
}