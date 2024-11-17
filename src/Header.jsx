import SearchBar from "./SearchBar.jsx"

export default function Header(props) {

    return(
        <header>
            <div className="logo">       
                <h1 className="logoText">Tempa-vibe</h1>  
                <img  src="https://via.placeholder.com/50" alt="Tempa-vibe logo" />    
            </div>

            <section className="inlineHeader">           
                <p className="location">Location: {props.location.name}</p>
                <SearchBar/>
            </section>


        </header>
    )
}