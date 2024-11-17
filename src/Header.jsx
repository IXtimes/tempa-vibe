import SearchBar from "./SearchBar.jsx"

import Logo from './assets/images/logo.png'

export default function Header(props) {

    return(
        <header>
            <p>Location: {props.location.name}</p>
            <SearchBar location={props.location} setLocation={props.setLocation}/>
            <img src={Logo} alt="Tempa-vibe logo" />
            <h1>Tempa-vibe</h1>
        </header>
    )
}