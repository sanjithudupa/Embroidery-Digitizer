import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Footer from "../components/Footer";

import ParticleBG from "particles-bg"
import { useHistory } from "react-router";
import { Collapse, Fade, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { CustomPlaceholder } from 'react-placeholder-image';

import { Search, Clock, AppIndicator, ClockHistory, ZoomIn, Window } from "react-bootstrap-icons";

const Home: React.FC = () => {

    const history = useHistory();
    const [stage, setStage] = useState(0);

    const [popup, setPopup] = useState(false);

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
                            <Button color="#A23B72" onClick={() => setPopup(true) /*history.push("/upload")*/}>Get Started</Button>
                        </Fade>
                    </div>
                </Fade>
            </div>

            <Footer />

            <Modal centered show={popup} onHide={() => setPopup(false)} style={{textAlign: "center"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose an embroidery strategy:</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display: "flex", justifyContent: "center"}}>
                    <div style={{border: "2px solid gray", borderRadius: 5, height: "230px", width: "100%", margin: 10, padding: "10px"}}>
                        <h5>InkStitch</h5>
                        <CustomPlaceholder width={180} height={105} style={{borderRadius: 5}} />
                        <br />
                        <div style={{margin: 5, display: "flex", justifyContent: "center"}}>
                            <div style={{marginLeft: 5, marginRight: 5}}>
                                <OverlayTrigger placement="top" overlay={<Tooltip id="search">High Quality</Tooltip>}>
                                    <Search size={20} color="#44DA27" />
                                </OverlayTrigger>
                            </div>
                            <div style={{marginLeft: 5, marginRight: 5}}>
                                <OverlayTrigger placement="top" overlay={<Tooltip id="search">Takes 15-25 min</Tooltip>}>
                                    <Clock size={20} color="#A23B72" />
                                </OverlayTrigger>
                            </div>
                            <div style={{marginLeft: 5, marginRight: 5}}>
                                <OverlayTrigger placement="top" overlay={<Tooltip id="search">Installation Required</Tooltip>}>
                                    <AppIndicator size={20} color="#A23B72" />
                                </OverlayTrigger>
                            </div>
                        </div>
                        {/* <i style={{fontSize: 12}}>15-25 min, High Quality, Requires Installation</i> */}
                        <Button variant="info">
                            Read
                        </Button>
                    </div>
                    <div style={{border: "2px solid gray", borderRadius: 5, height: "230px", width: "100%", margin: 10, padding: "10px"}}>
                        <h5>Emb.io</h5>
                        <CustomPlaceholder width={180} height={105} style={{borderRadius: 5}} />
                        <br />
                        <div style={{margin: 5, display: "flex", justifyContent: "center"}}>
                            <div style={{marginLeft: 5, marginRight: 5}}>
                                <OverlayTrigger placement="top" overlay={<Tooltip id="search">Takes <span>&#60;</span>5 min</Tooltip>}>
                                    <ClockHistory size={20} color="#44DA27" />
                                </OverlayTrigger>
                            </div>
                            <div style={{marginLeft: 5, marginRight: 5}}>
                                <OverlayTrigger placement="top" overlay={<Tooltip id="search">Fully in Browser, no installation required.</Tooltip>}>
                                    <Window size={20} color="#44DA27" />
                                </OverlayTrigger>
                            </div>
                            <div style={{marginLeft: 5, marginRight: 5}}>
                                <OverlayTrigger placement="top" overlay={<Tooltip id="search">Moderate Quality</Tooltip>}>
                                    <ZoomIn size={20} color="#A23B72" />
                                </OverlayTrigger>
                            </div>
                        </div>
                        {/* <i style={{fontSize: 12}}>15-25 min, High Quality, Requires Installation</i> */}
                        <Button variant="success" onClick={() => {
                            setPopup(false);
                            setTimeout(() => {
                                history.push("/upload");
                            }, 500)
                        }}>
                            Get Started
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Home;