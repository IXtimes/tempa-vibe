import SearchBar from "./SearchBar.jsx"
import Logo from './assets/images/logo.png'

export default function Header(props) {
    return(
        <header>
            <div className="logo">       
                <h1 className="logoText">Tempa-vibe</h1>  
                <img src={Logo} alt="Tempa-vibe logo" />    
            </div>

            <section className="inlineHeader">           
                <p className="location">{props.location.name}</p>
                <SearchBar />
            </section>

            <div id="clouds">
                <div className="cloud x1"></div>
                <div className="cloud x2"></div>
                <div className="cloud x3"></div>
                <div className="cloud x4"></div>
                <div className="cloud x5"></div>
            </div>
        </header>
    )
}