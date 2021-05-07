import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Collapse from "react-bootstrap/esm/Collapse";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer";
import { API_ENDPOINT } from "../constants";

import "../styles/toast.css";
import "../styles/toastify.css";

const Preview: React.FC<{embResult: any}> = ({embResult}) => {
    const showPercent = 35;
    const M_amount = 500000000;

    let toast_message = "{{ toast_message }}"

    const [animating, setAnimating] = useState(false);
    const [downloadStatus, setDownloadStatus] = useState("Download Embroidery File")

    const history = useHistory();

    function randomColor(){
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        return "#" + randomColor
    }

    function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms));}
    
    function showToast() {
        if(toast_message != ""){
            let x = document.getElementById("snackbar")!;
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        
        }
    }

    const run = async () => {
        let run_button = document.getElementById("run_button")! as HTMLButtonElement
        let run_button_holder = document.getElementById("run_button_holder")!
        let progress_bar = document.getElementById("progress_bar")!
        let progress = document.getElementById("sim_progress")!

        setAnimating(true)
        
        run_button.disabled = true;
        progress_bar.style.display = "block";
        progress.style.width = "0%"

        var canvas = document.getElementById("sim_canvas") as HTMLCanvasElement;
        var ctx = canvas.getContext("2d")!;
        var points = embResult.gcode; 
        let total = points.length

        let width = canvas.width
        let height = canvas.height

        let multiply = 2

        ctx.clearRect(0, 0, width, height);
        
        ctx.moveTo(points[0][0] * multiply ,points[0][1] * multiply);
        ctx.strokeStyle = randomColor()
        ctx.beginPath();
        
        for (let i = 1; i < total - 1; i++) {
            let x = points[i][0] * multiply;
            let y = points[i][1] * multiply;
            
            if(x == multiply*M_amount && y == multiply*M_amount){
                ctx.closePath();
                ctx.moveTo(points[i+1][0] * multiply, points[i+1][1] * multiply)
                let newColor = randomColor()
                let toastify = (window as any).Toastify({
                    text: "Started a new path with color: " + newColor,
                    duration: 2000,
                    backgroundColor: newColor,
                    position: 'right'
                }).showToast();
                ctx.strokeStyle = newColor
                ctx.beginPath();
            }else{
                ctx.lineTo(x,y);

                ctx.stroke();

                let percent = (100 * (i/total))
                if(percent >= showPercent){
                    progress.innerHTML = i.toString() + " stitches"
                }else{
                    progress.innerHTML = ""
                }
                progress.style.width = percent.toString() + "%"
            }

           

            await sleep(20);
        }
        
        await sleep(1000);

        run_button.disabled = false;
        progress_bar.style.display = "none";

        progress.style.width = "0%"
        setAnimating(false);
    }

    const download = () => {
        setDownloadStatus("File Already Downloaded");

        const data = new FormData();
        data.set("uid", embResult.uid);

        fetch(API_ENDPOINT + "/download", {
            method: "POST",
            body: data
        }).then((response) => {
            response.blob().then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = embResult.file;
                a.id = "DOWNLOAD_LINK";
                a.style.display = "none";

                const clickHandler = () => {
                    setTimeout(() => {
                        URL.revokeObjectURL(url);
                        a.removeEventListener('click', clickHandler)
                        // document.removeChild(document.getElementById(a.id)!);
                    }, 100);
                }

                a.addEventListener("click", clickHandler, false);
                document.body.appendChild(a);
                a.click();
            });
        })
    }
    
    useEffect(() => {
        if(embResult) {
            if(embResult.toast)
                showToast();
    
            download();
            run();
        } else {
            history.push("/");
        }
    }, []);

    return (
        <>
            {
                embResult.gcode ?
                <div style={{textAlign: "center"}}>
                    <h1>Digitization Complete</h1>
                    <canvas id="sim_canvas" width="500%" height="500%" style={{border: "1px solid #d3d3d3", borderRadius: "10px"}}>
                        Sorry, your browser doesn't support the embroidery simulation.
                    </canvas>

                    <br />

                    <Collapse in={animating}>
                        <div id="progress_bar">
                            <div className="progress" style={{width: "35%", margin: "auto", height: "12px"}}>
                                <div id="sim_progress" style={{width: "0%"}} className="progress-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                        </div>
                    </Collapse>

                    <div id="run_button_holder">
                        <br style={{margin: "10px"}} />
                        <button className="btn btn-success" onClick={run} id="run_button">Animate <strong>{embResult.gcode.length}</strong> stitches</button>
                    </div>

                    <hr style={{width: "75%"}} />

                    <Button onClick={download} variant="outline-info" disabled={downloadStatus == "File Already Downloaded"}>
                        {downloadStatus}
                    </Button>

                    <Footer />

                    <div id="snackbar">{embResult.toast}</div>
                </div>

                : <Redirect to="/" />
            }
        </>
    )
}

export default Preview;