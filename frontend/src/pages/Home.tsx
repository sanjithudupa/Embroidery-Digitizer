import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Footer from "../components/Footer";

import ParticleBG from "particles-bg"
import { useHistory } from "react-router";
import { Collapse, Fade } from "react-bootstrap";
import { setConstantValue } from "typescript";

const Home: React.FC = () => {

    const history = useHistory();
    const [stage, setStage] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setStage(1)
            setTimeout(() => {
                setStage(2)
                setTimeout(() => {
                    setStage(3)
                    setTimeout(() => {
                        setStage(4)
                    }, 500)
                }, 750)
            }, 600)
        }, 500)
    },[])

    return (
        <div>
            <ParticleBG type="cobweb" bg={true} color="#A23B72" /> 

            <div style={{position: "absolute", top: "30%", width: "100%", textAlign: "center", zIndex: 0}}>
                <Fade in={stage >= 1}>
                    <h1 style={{fontSize:50}}>Embroidery made 
                        <Collapse in={stage >= 1}>
                            <div style={{display: "inline"}}>
                                <span style={{color: "#F18F01"}}> simple.</span>
                            </div>
                        </Collapse>
                    </h1>
                </Fade>

                <Fade in={stage >= 2}>
                    <div>
                        Easily convert images to embroidery files <strong>in seconds.</strong> <a href="#">See how it works.</a>
                        <br/>
                        <br/>
                    </div>
                </Fade>

                <Fade in={stage >= 3}>
                    <div>
                        <i>Ready to start making great designs?</i>
                        <br/>
                        <br></br>
                        <Fade in={stage >= 4}>
                            <Button color="#A23B72" onClick={() => history.push("/upload")}>Get Started</Button>
                        </Fade>
                    </div>
                </Fade>
            </div>

            <Footer />
        </div>
    )
}

export default Home;