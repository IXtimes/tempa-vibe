import SearchBar from "./SearchBar.jsx"

export default function Header(props) {

    return(
        <header>
            <p>Location: {props.location.name}</p>
            <SearchBar location={props.location} setLocation={props.setLocation}/>
            <img src="https://via.placeholder.com/50" alt="Tempa-vibe logo" />
            <h1>Tempa-vibe</h1>
        </header>
    )
}