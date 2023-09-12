import { useLocation } from "react-router-dom";

function Home(props){

    const location = useLocation();


    return(
        <div>
            <h1>Bem-vindo {location.state && location.state.name}</h1>
        </div>
    )
}

export default Home;