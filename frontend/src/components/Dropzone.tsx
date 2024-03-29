import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

import { API_ENDPOINT } from "../constants";

import "../styles/dropzone.css";

const Dropzone: React.FC<{setFile?: Function}> = ({setFile}) => {
    let file_drop_div: HTMLDivElement;
    let image: HTMLInputElement;
    let upload_help_label: HTMLLabelElement;

    const [filename, setFilename] = useState("");
    const [reading, setReading] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);

    // const FPS = 30;
    // const [translate, setTranslate] = useState(0);
    // const [scale, setScale] = useState(1);
    
    useEffect(() => {
        file_drop_div = document.getElementById("file-drop-div") as HTMLDivElement;
        image = document.getElementById("image") as HTMLInputElement;
        upload_help_label = document.getElementById("upload-help-label") as HTMLLabelElement;

        // let frame = 0;

        // setInterval(() => {
        //     if (frame >= 600)
        //         frame = 0
            
        //     setTranslate(Math.sin(frame/100));
        //     setScale(-0.6 * Math.sin(frame));
            
        //     frame++;
        // }, 1000/FPS);
    }, []);

    function fileDragged() {
        if (file_drop_div) {
            file_drop_div.style.borderStyle = "solid";
            file_drop_div.style.borderColor = "black";
            file_drop_div.style.backgroundColor = "#f8f9fa";
        }
    }
    function fileNotDragged() {
        if (file_drop_div) {
            file_drop_div.style.borderStyle = "dashed";
            file_drop_div.style.borderColor = "#6c757d";
            file_drop_div.style.backgroundColor = "transparent";
        }
    }

    function resetFileUpload(){
        image.value = ""
        upload_help_label.innerHTML = "<strong>Click to select or drag an image...</strong>"
        fileNotDragged();
    }

    function fileAdded(){
        fileNotDragged();
        let fname = image.value.split(/(\\|\/)/g).pop()!;
        if(fname.includes(".")){
            setFilename(fname);
        }else{
            resetFileUpload();
        }
        
        const reader = new FileReader();
        setReading(true);

        reader.onload = (event) => {
            const result = event.target!.result;
            if(setFile)
                setFile()
            setReading(false);
        };

        reader.onprogress = (event) => {
            const percent = ((event.loaded / event.total) * 100);
            setReadingProgress(Math.round(percent));
        };

        reader.readAsDataURL(image.files![0]);
    }

    return (
        <form id="dropzone_form" action={`${API_ENDPOINT}/upload`} method = "POST" encType="multipart/form-data">
            <div id="file-drop-div" onDragEnter={fileDragged} onClick={fileDragged} onMouseUp={fileNotDragged} onDragLeave={fileNotDragged}>
                <input onChange={fileAdded} type="file" name="image" accept=".svg" id="image" />
                
                <div id="svg-container">
                <svg id="upload-icon" className="bi bi-upload" width="10%" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    {/* <g transform={`translate(0, ${0}) scale(1, ${1})`}> */}
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8A.5.5 0 0 1 8 2z"/>
                        <path d="M5 4.854a.5.5 0 0 0 .707 0L8 2.56l2.293 2.293A.5.5 0 1 0 11 4.146L8.354 1.5a.5.5 0 0 0-.708 0L5 4.146a.5.5 0 0 0 0 .708z" />
                    {/* </g> */}
                    <path fill-rule="evenodd" d="M.5 8a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5a.5.5 0 0 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5A.5.5 0 0 1 .5 8z"/>
                </svg>

                {/* <svg id="upload-icon" className="bi bi-upload" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" width="15%" fill="#000000">
                    <g>
                        <rect fill="none" height="24" width="24"/>
                    </g>
                    <g>
                        <path strokeWidth="5" d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z"/>
                    </g>
                </svg> */}


                </div>
                
                <div id="help-label-container" style={{textAlign: "center", marginTop: `-${reading ? 80 : 50}px`, paddingBottom: "px"}}>
                    <label id="upload-help-label"><strong>Click to select or drag an image...</strong> <br /> <strong style={{color: "#A23B72"}}>{filename}</strong> </label>
                    {
                        reading ?
                        <ProgressBar now={readingProgress} style={{ width: "75%", justifySelf: "center", margin: "auto", height: "10px"}} />
                        : <></>
                    }
                </div>
            </div>

            <input id="ext_input" type="text" hidden name="extension" />
            <input id="fill_input" type="checkbox" hidden name="fill" />
        </form>
    )
}

export default Dropzone;