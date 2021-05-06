import React, { useState } from "react";
import { Button, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Dropzone from "../components/Dropzone";
import Footer from "../components/Footer";

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

    const [dropdown, setDropdown] = useState("Output File Type");
    const [value, setValue] = useState("Yes");

    return (
        <div style={{height: "100%", overflow: "hidden"}}>
            <div style={{textAlign: "center", height: "99%", overflow: "auto"}}>
                <br />
                <h2>Let's start digitizing!</h2>
                <br />

                <h6>First, <strong>upload</strong> an SVG image file.</h6>
                <br />

                <Dropzone />

                <br />

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

                Great, would you like your file to be <strong>filled?</strong>
                <br />
                <a href="#">Show me what this means.</a>

                <br />
                <br />

                <ToggleButtonGroup
                    name="value"
                    type="radio"
                    value={value}
                    onChange={(value) => setValue(value)}
                >
                    <ToggleButton value={"Yes"} variant="secondary">Yes</ToggleButton>
                    <ToggleButton value={"No"} variant="secondary">No</ToggleButton>
                </ToggleButtonGroup>

                <br />
                <br />

                Now, start the digitzation process!
                <br />
                <i>This may take up to two minutes</i>

                <br />
                <br />

                <Button variant="success">
                    Digitize!
                </Button>

                <br />

                h 
                

            </div>
            <br />
            <br />
            <Footer sticky />
        </div>
    )
}

export default Upload;