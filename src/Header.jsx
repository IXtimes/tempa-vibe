import SearchBar from "./SearchBar.jsx"

export default function Header(props) {

    return(
        <header>
            <p>Location: {props.location.name}</p>
            <SearchBar/>
        </header>
    )
}