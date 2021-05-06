import React, { useState } from "react";
import { Button, Collapse, Spinner, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Dropzone from "../components/Dropzone";
import Footer from "../components/Footer";

import $ from "jquery";

const Upload: React.FC = () => {

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

    const [pressed, setPressed] = useState(false);

    const sendFile = () => {
        setPressed(true);
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
                        <a href="#">Not sure which type to choose?</a>

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
                        <a href="#">Show me what this means.</a>

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
        </div>
    )
}

export default Upload;