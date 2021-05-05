import React from "react";

import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";

import ParticleBG from "particles-bg"

const Home: React.FC = () => {
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
                <Button color="#A23B72">Get Started</Button>
            </div>
        </div>
    )
}

export default Home;