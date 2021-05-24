import React, { useEffect, useState } from "react";
import { Button, Collapse, Modal, Spinner, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Dropzone from "../components/Dropzone";
import Footer from "../components/Footer";

import $ from "jquery";
import { API_ENDPOINT } from "../constants";
import { useHistory } from "react-router";

import FilledImage from "../assets/images/FilledExample.png";
import UnfilledImage from "../assets/images/UnfilledExample.png";

const Upload: React.FC<{setEmb: Function}> = ({setEmb}) => {

    const extensions = [
        "PES",
        "PEC",
        "DST",
        "EXP",
        "JST",
        "VP3",
        "U01"
    ]

    const [dropzoneSet, setDropzoneSet] = useState(false);

    const [dropdown, setDropdown] = useState("Output File Type");
    const [value, setValue] = useState("");
    const [popup, setPopup] = useState(false);
    const [popupType, setPopupType] = useState(true);

    const [pressed, setPressed] = useState(false);

    const history = useHistory();

    const sendFile = () => {
        setPressed(true);

        const fileInput = document.getElementById("image") as HTMLInputElement;

        const data = new FormData();
        data.append("image", fileInput.files![0]);
        data.append("extension", `.${dropdown.toLowerCase()}`);
        data.append("fill", (value == "Yes").toString());

        fetch(API_ENDPOINT + "/digitize", {
            method: "POST",
            body: data
        }).then((response) => {
            response.json().then((body) => {
                setEmb(body);
                history.push("/preview");
            });
        });
    }

    return (
        <div style={{height: "100%", overflow: "hidden"}}>
            <div style={{textAlign: "center", height: "99%", overflow: "auto"}}>
                <br />
                <h2>Let's start digitizing!</h2>
                <br />

                <h6>First, <strong>upload</strong> an SVG image file.</h6>
                <br />

                <Dropzone setFile={() => setDropzoneSet(true)} />

                <br />

                <Collapse in={dropzoneSet}>
                    <div>
                        <h6>Now, choose your <strong>output file type.</strong></h6>
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setPopupType(false);
                            setPopup(true);
                        }}>Not sure which type to choose?</a>

                        <br />
                        <br />

                        <Dropdown>
                            <Dropdown.Toggle variant="info">
                                {dropdown}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {
                                    extensions.map((extension) => {
                                        return <Dropdown.Item onClick={() => setDropdown(extension)}>{extension}</Dropdown.Item>
                                    })
                                }
                            </Dropdown.Menu>

                        </Dropdown>

                        <br />
                        <br />
                    </div>
                </Collapse>

                <Collapse in={dropdown != "Output File Type"}>
                    <div>
                        Great, would you like your file to be <strong>filled?</strong>
                        <br />
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            setPopupType(true);
                            setPopup(true);
                        }}>Show me what this means.</a>

                        <br />
                        <br />

                        <ToggleButtonGroup
                            name="value"
                            type="radio"
                            value={value}
                            onChange={(value) => {
                                setValue(value);
                                setTimeout(() => {
                                    $([document.documentElement, document.body]).animate({
                                        scrollTop: $("#sendButton").offset()!.top
                                    }, 1000);
                                }, 50);
                            }}
                        >
                            <ToggleButton value={"Yes"} variant="secondary">Yes</ToggleButton>
                            <ToggleButton value={"No"} variant="secondary">No</ToggleButton>
                        </ToggleButtonGroup>

                        <br />
                        <br />
                    </div>
                </Collapse>

                <Collapse in={value == "Yes" || value == "No"}>
                    <div>
                        Now, start the digitzation process!
                        <br />
                        <i>This may take up to two minutes</i>

                        <br />
                        <br />

                        <Button id="sendButton" variant="success" onClick={() => sendFile()} disabled={pressed}>
                            { pressed ?
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> :
                                <span>Digitize!</span>
                            }
                        </Button>

                        <br />
                    </div>
                </Collapse>           

            </div>
            <br />
            <br />
            <Footer sticky={dropdown != "Output File Type"} />

            <Modal centered show={popup} onHide={() => setPopup(false)} style={{textAlign: "center"}}>
                <Modal.Header closeButton>
                    <Modal.Title>{popupType ? "Filled Embroidery" : "What File Type Should I Use?"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        popupType ? 
                        <div>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <div style={{width: "50%", margin: "10px"}}>
                                    <h3>Filled</h3>
                                    <img src={FilledImage} style={{width: "80%"}} />
                                </div>
                                <div style={{width: "50%", margin: "10px"}}>
                                    <h3>Not Filled</h3>
                                    <img src={UnfilledImage} style={{width: "75%"}} />
                                    <br />
                                    <i style={{fontSize: 10}}>The Avengers Logo is a trademark of Disney.</i>
                                </div>
                            </div>
                            <i style={{fontSize: 15}}>Selecting the <strong>fill</strong> option may take a longer time to digitize.</i>
                        </div>
                        :
                        <div>
                            Different embroidery machines accept different file types for their embroidery designs.
                            <a href="https://www.embroidery.com/machine-embroidery-formats.ec"> Here is a table with common embroidery machines and what files they accept. </a>
                            Note that many machines accept multiple file types and aren't limited by what is listed below.

                            <br />

                            <i style={{fontSize: 10}}>If your Machine is not listed, go with one of the common formats(<strong>PES, PEC, DST, or EXP</strong>)</i>

                        </div>
                    }
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default Upload;