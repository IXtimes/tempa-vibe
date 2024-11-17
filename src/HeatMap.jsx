import {GoogleMap, LoadScript, HeatmapLayer} from '@react-google-maps/api'
import { useEffect, useState } from 'react';

export default function HeatMap(props) {
    const [data, setData] = useState([]);
    const quality = 3;

    async function getHeatAwah() {
        let dataset = []
        for (let i = -quality; i <= quality; i++) {
            for (let j = -quality; j <= quality; j++) {
                let lat = props.location.lat - (0.005 * i)
                let lng = props.location.lng - (0.005 * j)
                const heatResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`)
                if(heatResponse.statusText !== 'OK')
                    throw new Error("Failed to generate heat information")
                let {main} = await heatResponse.json()
                
                console.log({lat: lat, lng: lng, weight: 1})
                dataset.push({lat: lat, lng: lng, weight: 1})
            }
        }
        setData(dataset)
    }

    /*
    useEffect(() => {
        try {
            if(props.location.name !== "unknown")
                getHeatAwah()
        } catch(error) {
            console.error(error)
        }
    }, [props.location])
    */

    return(
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GEOCODE_API_KEY} libraries={["visualization"]}>
            <GoogleMap
                mapContainerStyle={{ height: '400px', width: '100%' }}
                center={{lat: props.location.lat, lng: props.location.lng}}
                zoom={15}
            >
                <HeatmapLayer data={data}/>
            </GoogleMap>
        </LoadScript>
    )
}