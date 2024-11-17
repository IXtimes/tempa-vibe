import {useRef} from 'react'
import {fromAddress} from 'react-geocode'

export default function SearchBar(props) {
    const inputRef = useRef(null)

    async function getCoords(address) {
        let response
        try {
            response = await fromAddress(address)
        } catch (error) {
            console.error("Failed to determine address!")
            inputRef.current.value = props.location.name;
        }


        if(response.status !== "OK")
            throw new Error("Bad response!")

        const {lat, lng} = response.results[0].geometry.location
        const name = response.results[0].formatted_address

        props.setLocation({lat: lat, lng: lng, name: name})
    }

    function updateLocation() {
        try {
            getCoords(inputRef.current.value)
        } catch (error) {
            console.error("Failed to determine address!")
            inputRef.current.value = props.location.name;
        }
    }

    return (
        <div>
            <input type="text" ref={inputRef} placeholder="Location Search Bar"/>
            <button onClick={updateLocation}>Submit</button>
        </div>
    )
}