
// Import React Assets
import React, { useRef, useState, useEffect } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import * as fp from "fingerpose";
import {Box,Button,LinearProgress,Paper,Switch,Typography,} from '@mui/material';
import { deepPurple, grey, teal, green, red, blue } from '@mui/material/colors';

//import gesture js Assets
import ThumbsDownGesture from '../gestures/ThumbsDown.js';
import OKSignGesture from '../gestures/OKSign.js';
import RaisedHandGesture from '../gestures/RaisedHand.js';
import LoveYouGesture from '../gestures/LoveYou.js';
import RockOnGesture from '../gestures/RockOn.js';
import CallMeGesture from '../gestures/CallMe.js';
import RaisedFistGesture from '../gestures/RaisedFist.js';
import { drawHand } from "../utils/utils";
import { history } from '../utils/history'
// import Quiz Process Assets
import { questions } from './process/questions';
// import Images Process Assets
import { images } from './process/images';

const Quiz = () => {

    // Webcam , canvas , emoji Declaration
    const [emoji, setEmoji] = useState(null);
    const [selectedGestureVal, setSelectedGestureVal] = useState(0);
    const [finalAnswer, setGetFinalAns] = useState(0);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const height = 300;

    // Quiz declaration
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score , setScore] = useState(0);
    const [selectedAnswer, setSelectedAns] = useState(0);
    const [showSelectAns, setShowSelectAns] = useState(false);
    const [showCorrectAns, setShowCorrectAns] = useState(false);
   
    
    // new Added
    const videoComponentHeight = 300;

    // Handpose Model
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
            
            // Gesture Handlings
            var getValue = 0;
            const victoryGesture = fp.Gestures.VictoryGesture;
            const thumbsUpGesture = fp.Gestures.ThumbsUpGesture;
            if(hand.length > 0) {
                const GE = new fp.GestureEstimator([
                //fp.Gestures.VictoryGesture,
                //fp.Gestures.ThumbsUpGesture,
                victoryGesture,
                thumbsUpGesture,
                ThumbsDownGesture,
                OKSignGesture,
                RaisedHandGesture,
                LoveYouGesture,
                RockOnGesture,
                CallMeGesture,
                RaisedFistGesture
            ]);
            
            const gesture = await GE.estimate(hand[0].landmarks, 4);
            if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
                //console.log(gesture.gestures);
                const confidence = gesture.gestures.map(
                    (prediction) => prediction.score
                );
                const maxConfidence = confidence.indexOf(
                    Math.max.apply(null, confidence)
                );
                var getMaxConfidenceValue = gesture.gestures[maxConfidence].name
                setEmoji(getMaxConfidenceValue);
                //console.log(emoji);
                console.log('Max Confidence Value : ' , getMaxConfidenceValue)

                if(getMaxConfidenceValue === 'victory') {
                    getValue = 1;
                } else if(getMaxConfidenceValue === 'love_you') {
                    getValue = 2;
                } else if(getMaxConfidenceValue === 'call_me') {
                    getValue = 3;
                } else if(getMaxConfidenceValue === 'thumbs_up') {
                    getValue = 4;
                } else {
                    getValue = 0;
                }
            }
            } else {
                setEmoji(null);
            }

            const ctx = canvasRef.current.getContext("2d");
            drawHand(hand, ctx);
            
            if(getValue !== 0) {
            console.log('getValue : ', getValue)
            }
            return getValue;
        }
    };

     // progress Bar
    const progressBarFull = document.querySelector('#progressBarFull');
    // runHandpose
    function runHandpose(net) {
        console.log('Handpose Model Loaded');
        setInterval(() => {
            detect(net).then((result) => {
                setSelectedGestureVal(result);
            });
        }, 1000)
    }

    // get final Answer
    function getFinalAnswer(answer) {
        if(answer !== 0) {
            setTimeout(() => {
                console.log(selectedAnswer , answer);
                if(selectedAnswer === answer) {
                    if(selectedGestureVal === answer) {
                        setGetFinalAns(selectedGestureVal);
                    } else {
                        setGetFinalAns(0);
                    }
                }
            }, 3000)
        }
    }

    // get score incQuestionNum
    function getCurrentQuestion() {
        if(currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1)
           
        } else {
            history.push({ pathname: '/score', search: `?score=${ score }` });
            history.go(0);
        }
    }

    // Check Answer
    function checkCorrectAnswer() {
        if(questions[currentQuestion].answerOptions[finalAnswer - 1].isCorrect) {
            setScore(score + 100);
        }
        setShowCorrectAns(true);
        setTimeout(() => {
            setShowCorrectAns(false);
            getCurrentQuestion();
        }, 3000);
        setGetFinalAns(0);
        progressBarFull.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`
    }

    // using Effect
    useEffect(() => {
        handpose.load().then((result) => {
            runHandpose(result);
        })
    })

    useEffect(() => {
        if(selectedGestureVal !== 0) {
            setShowSelectAns(true);
            setSelectedAns(selectedGestureVal);
        } else {
            setShowSelectAns(false);
            setSelectedAns(selectedGestureVal);
        }
    }, [selectedGestureVal])

    useEffect(() => {
        if(selectedAnswer !== 0) {
            getFinalAnswer(selectedAnswer);
        }
    }, [selectedAnswer])

    useEffect(() => {
        if (finalAnswer !== 0) {
            checkCorrectAnswer();
        }
    }, [finalAnswer])
    console.log('Answer Selected: ', selectedAnswer)
    console.log('CurrentQuestions: ' , currentQuestion)

   
    

    return (
        <div className="quiz">
        <>
        <Webcam 
        className="webcam"
        ref = { webcamRef }
        style = {
        {
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 600,
            right: 0,
            top: 20,
            textAlign: "center",
            zindex: 9,
            width: 340,
            height: 240,
            border: 150,
        }
        }
        />
        <canvas 
        ref = { canvasRef }
        style = {
        {
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 600,
            right: 0,
            top: 20,
            textAlign: "center",
            zindex: 9,
            width: 340,
            height: 240,
            border: 150,
        }
        }
        />
        {emoji && (
        <Box
        sx={{
            right: '15px',
            bottom: '15px',
            background: teal[1900],
            borderRadius: '10px',
            position: 'absolute',
            aspectRatio: '1/1',
            transition: 'all 0.5s ease',
            zIndex: 3,
        }}
        >
        <img
        src={ images[emoji] }
        style={{
            height: `${height / 3}px`,
            width: 'auto',
        }}
        />
        </Box>
        )}
        </>
        <div className="container">
            <div id="game" className="justify-center flex-column">
                <div id="hud">
                <div className="hud-item">
                    <p id="progressText" className="hud-prefix">
                        Question
                    </p>
                <div id="progressBar" variant="determinate">
                    <div id="progressBarFull">
                       
                    </div>
                </div>
            </div>
        <div className="hud-item">
            <p className="hud-prefix">Score</p>
                <h1 className="hud-main-text" id="score">{score}</h1>
            </div>
        </div>
        <h1 id="question"> {questions[currentQuestion].questionText}</h1>
            {questions[currentQuestion].answerOptions.map((list, index) => (
        <Paper 
        className="choice-container"  
        key={index}
        sx={{
            mb: 1,
            p: 2,
            background: showCorrectAns
            ? list.isCorrect
                ? green[700]
                    : red[700]
                : showSelectAns
            ? selectedGestureVal - 1 === index
                ? blue[700]
                    : blue[500]
                    : blue[500],
            color: grey[50],
            display: 'flex',
            alignItems: 'center',    
        }}
        >
       <span style={{fontSize: 50}}> {list.symbol} </span>
        <p className="choice-text" style={{fontSize: 25}}>
            {list.answerText}
        </p>
        </Paper>
        ))}
            </div>
        </div>
    </div>
    );
} 

export default Quiz;


  
