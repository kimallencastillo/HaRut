// Import React Assets //
import React, { useRef, useState, useEffect } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import * as fp from "fingerpose";
import { Link, useParams, useNavigate } from 'react-router-dom';
// Import Hand Gesture Assets
import ThumbsDownGesture from '../gestures/ThumbsDown';
import OKSignGesture from '../gestures/OKSign.js';
import RaisedHandGesture from '../gestures/RaisedHand.js';
import LoveYouGesture from '../gestures/LoveYou.js';
import RockOnGesture from '../gestures/RockOn.js';
import CallMeGesture from '../gestures/CallMe.js';
import RaisedFistGesture from '../gestures/RaisedFist.js';
import { images } from '../utils/images';
import { drawHand } from '../utils/utils';

function App() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [emoji, setEmoji] = useState(null);
    const { name, age} = useParams();   
    const historyParam = useNavigate();
    const runHandpose = async() => {
        const net = await handpose.load();
        console.log("handpose model loaded");
        // loop and detect hand
        setInterval(() => {
            detect(net)
        }, 100);

    }
    function goHome(){
        historyParam( `/menu/${name}/${age}`, {replace: `${name}/${age}`})

    }
    const detect = async(net) => {
        // Check data is available
        if (typeof webcamRef.current !== "undefined" &&
            webcamRef.current != null &&
            webcamRef.current.video.readyState === 4) {
            // get video properties
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;
            // set video width and height
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
            // set canvas width and height
            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
            // make detection
            const hand = await net.estimateHands(video);

            if (hand.length > 0) {
                const GE = new fp.GestureEstimator([
                    fp.Gestures.VictoryGesture,
                    fp.Gestures.ThumbsUpGesture,
                    ThumbsDownGesture,
                    OKSignGesture,
                    RaisedHandGesture,
                    LoveYouGesture,
                    RockOnGesture,
                    CallMeGesture,
                    RaisedFistGesture
                ])
                const gesture = await GE.estimate(hand[0].landmarks, 8);
                if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
                    console.log(gesture.gestures);
                    const confidence = gesture.gestures.map(
                        (prediction) => prediction.score
                    );
                    console.log(confidence);
                    const maxConfidence = confidence.indexOf(
                        Math.max.apply(null, confidence)
                    );
                    //console.log(maxConfidence);
                    setEmoji(gesture.gestures[maxConfidence].name);
                    console.log(emoji);
                }
            }

            // Draw mesh
            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx);

        }
    }

    useEffect(()=>{
        runHandpose()}
        ,[]);
    const videoComponentHeight = 480;
    return ( 
        <div className = "App" style={{marginTop: "55px"}}>
            <button onClick={goHome} className="btn-accept">Go Home<i className="fas fa-home" ></i></button>  
    
            <h1 className="title">TEST HAND GESTURE </h1>
       
            
        <Webcam ref={webcamRef}
        style = {{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: `${videoComponentHeight}px`
        }}/> 

        <canvas ref={canvasRef}
        style = {{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: `${videoComponentHeight}px`
        }}/>

        {emoji !== null ? ( 
        <img src = { images[emoji] }
        style = {{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 400,
            bottom: 400,
            right: 0,
            textAlign: "center",
            width: 'auto',
            height: `${videoComponentHeight / 3}px`
            }}/>
            ) : (
                ""
            )
        } 
        </div>
    );
}

export default App;