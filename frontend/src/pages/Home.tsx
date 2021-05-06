import React from "react";

import Button from "react-bootstrap/Button";
import Footer from "../components/Footer";

import ParticleBG from "particles-bg"
import { useHistory } from "react-router";

const Home: React.FC = () => {

    const history = useHistory();
    
    return (
        <div>
            <ParticleBG type="cobweb" bg={true} color="#A23B72" /> 

            <div style={{position: "absolute", top: "30%", width: "100%", textAlign: "center"}}>
                <h1>Embroidery made <span style={{color: "#F18F01"}}>simple.</span></h1>

                Easily convert images to embroidery files <strong>in seconds.</strong> <a href="#">See how it works.</a>
                <br/>
                <br/>
                <i>Ready to start making great designs?</i>
                <br/>
                <br></br>
                <Button color="#A23B72" onClick={() => history.push("/upload")}>Get Started</Button>
            </div>

            <Footer />
        </div>
    )
}

export default Home;