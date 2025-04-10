import { useEffect } from "react";
import Background from "../components/background";
import NavBar from "../components/NavBar";
import Salecontainer from "../components/Salescontainer";
import "../components/Salecontainer.css";

function Home() {
    useEffect(() => {
        // Cambiar el título de la página
        document.title = "Steam Sales Tracker";

        // Cambiar el favicon dinámicamente
        const favicon = document.querySelector("link[rel='icon']");
        if (favicon) {
            favicon.href = "/favicon.ico"; // Cambia la ruta al favicon deseado
        }
    }, []); // Solo se ejecuta una vez al montar el componente

    return (
        <div>
            <NavBar />
            <Background />
            <h1>Welcome to Steam Sales Page</h1>
            <h2>Check out the best deals on Steam</h2>
            <Salecontainer />
        </div>
    );
}

export default Home;