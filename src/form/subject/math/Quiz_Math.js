
// Import React Assets //
import React, { useRef, useState, useEffect } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import * as fp from "fingerpose";
import { Box, Button, LinearProgress, Paper, Switch, Typography, } from '@mui/material';
import { deepPurple, grey, teal, green, red, blue } from '@mui/material/colors';
//import randomQuestion from "random-question";
// Import Hand Gesture Assets
import ThumbsDownGesture from '../../../gestures/ThumbsDown';
import OKSignGesture from '../../../gestures/OKSign.js';
import RaisedHandGesture from '../../../gestures/RaisedHand.js';
import LoveYouGesture from '../../../gestures/LoveYou.js';
import RockOnGesture from '../../../gestures/RockOn.js';
import CallMeGesture from '../../../gestures/CallMe.js';
import RaisedFistGesture from '../../../gestures/RaisedFist.js';
import { drawHand } from '../../../utils/utils';
import { history } from '../../../utils/history';
import { images } from '../../../utils/images';

// Import Questions
import { easyQuestions } from './mode/Easy';
import { medQuestions } from './mode/Medium';
import { hardQuestions } from './mode/Hard';
//import { randoQuest } from './mode/randomQuestion';

const QuizMath = () => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
    let mode = params.mode;
    let name = params.name;
    let questions = []
    var random = []
    if(mode === "easy") {
      questions = easyQuestions;
    } else if(mode === "medium") {
      questions = medQuestions;
    } else if(mode === "hard") {
      questions = hardQuestions;
    }
    //randomQuestion(questions);
    /*
    let ctr = 0;
    if(ctr > 1 ){

    }else {
      ctr++;
        var n = questions.length;
        questions.sort(() => 0.5 - Math.random()).slice(0, n);
       
    }
    
    let ctr = 0
    if(ctr == 0 ) {
      //var n = questions.length;
      //questions.sort(() => 0.5 - Math.random()).slice(0, n);
      ctr++;
    }else if(ctr > 1) {
      ctr = 19;
    }
    console.log(ctr)
    */
    //var n = questions.length;
    //questions.sort(() => 0.5 - Math.random()).slice(0, n)
    //questions = Math.floor(Math.random() * random.length);


    // Webcam , canvas , emoji Declaration
    const [showSkeleton, setShowSkeleton] = useState(true);
    const [emoji, setEmoji] = useState(null);
    const [selectedGesture, setSelectedGesture] = useState(0);
    const [finalAnswer, setFinalAnswer] = useState(0);
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [randomQ, setRandomQ] = useState(false);
    const videoComponentHeight = 300;
    const showSkeletonChange = (e) => {
        setShowSkeleton(e.target.checked);
    };

    // Quiz declaration
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score , setScore] = useState(0);
    const [selectedAnswer, setSelectedAns] = useState(0);
    const [showSelectAns, setShowSelectAns] = useState(false);
    const [showCorrectAns, setShowCorrectAns] = useState(false);

    // progress Bar
    const progressBarFull = document.querySelector('#progressBarFull');

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
                } else if(getMaxConfidenceValue === 'raised_hand') {
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
    
    // runHandpose
    function runHandpose(net) {
        console.log('Handpose Model Loaded');
        setInterval(() => {
            detect(net).then((result) => {
                setSelectedGesture(result);
            });
        }, 1000)
    }
    // get final Answer
    function getFinalAnswer(answer) {
        if(answer !== 0) {
            setTimeout(() => {
                console.log(selectedAnswer , answer);
                if(selectedAnswer === answer) {
                    if(selectedGesture === answer) {
                        setFinalAnswer(selectedGesture);
                    } else {
                        setFinalAnswer(0);
                    }
                }
            }, 3000)
        }
    }
    function getScore() {
        if(questions[currentQuestion].answerOptions[finalAnswer - 1].isCorrect) {
        history.push({ pathname: '/score', search: `?score=${ score }` });
        history.go(0);
        } else {
        history.push({ pathname: '/score', search: `?score=${ score }` });
        history.go(0);  
        }
    }
    // get score incQuestionNum
    function getCurrentQuestion() {
        progressBarFull.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`
        if(currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            //setRandomQ(true);
           
        } else {
            getScore();
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
        setFinalAnswer(0);
        
    }

    //random Quesiton
    
    //function randomQuestion(questions) {
    // return randoQuest(questions);
    //}

    // using Effect
    useEffect(() => {
        handpose.load().then((result) => {
            runHandpose(result);
            setRandomQ(false);
        })
    })
    
    useEffect(() => {
        if(selectedGesture !== 0) {
            setShowSelectAns(true);
            setSelectedAns(selectedGesture);
        } else {
            setShowSelectAns(false);
            setSelectedAns(selectedGesture);
        }
    }, [selectedGesture])

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
        <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-top',
          }}
        >
          <Box>
            <Box
              sx={{
                my: 1,
                gap: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Typography>Show skeleton</Typography>
              <Switch
                size="small"
                checked={showSkeleton}
                onChange={showSkeletonChange}
              />
            </Box>
            <Box
              sx={{
                height: `${videoComponentHeight}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <Webcam
                ref={webcamRef}
                style={{
                  height: `${videoComponentHeight}px`,
                  width: 'auto',
                  boxShadow: `0 4px 8px -4px rgba(0, 0, 0, 0.75)`,
                  borderRadius: '10px',
                  boxSizing: 'border-box',
                  zIndex: 1,
                }}
              />
              <canvas
                ref={canvasRef}
                style={{
                  height: `${videoComponentHeight}px`,
                  width: 'auto',
                  zIndex: 2,
                  position: 'absolute',
                  display: showSkeleton ? 'block' : 'none',
                }}
              />
  
              {emoji && (
                <Box
                  sx={{
                    right: '15px',
                    bottom: '15px',
                    background: teal[700],
                    borderRadius: '10px',
                    position: 'absolute',
                    aspectRatio: '1/1',
                    transition: 'all 0.5s ease',
                    zIndex: 3,
                  }}
                >
                  <img
                    src={images[emoji]}
                    style={{
                      height: `${videoComponentHeight / 3}px`,
                      width: 'auto',
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
  
  
        
        <Box sx={{ mt: 8, display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h3" sx={{ color: teal[300] }}>
                Question {currentQuestion + 1}
              </Typography>
              <Typography variant="h5" sx={{ color: grey[300] }}>
                /{questions.length}
              </Typography>
            </Box>
            <div id="progressBar" variant="determinate" value={((currentQuestion + 1) / questions.length) * 100}>
                    <div id="progressBarFull"
                    
                    >   
                    </div>
                </div>
          </Box>
          <Box
            sx={{
              flexGrow: 8,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h5" sx={{ color: grey[300] }}>
                Score:
              </Typography>
              <Typography variant="h3" sx={{ color: teal[300] }}>
                {score}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mt: 4 }}>
            
            {/* Question */}
       
              <h2 className='question-text'>{questions[currentQuestion].questionText}</h2> 
        
          </Box>
           {/* End Question */}
           
          {/* Questions */}
          <Box
            sx={{ mt: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}
          >
            {questions[currentQuestion].answerOptions.map((option, index) => (
              
              <Paper
                className="choice-container"  
                key={index}
                sx={{
                  mb: 1,
                  p: 2,
                  background: showCorrectAns
                    ? option.isCorrect
                      ? green[700]
                      : red[700]
                    : showSelectAns
                    ? selectedGesture - 1 === index
                      ? blue[700]
                      : blue[500]
                    : blue[500],
                  color: grey[50],
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h2"
                  sx={{ mr: 2, width: '2ch', textAlign: 'center' }}
                >
                  {option.symbol}
                </Typography>
                <Typography variant="h5">{option.answerText}</Typography>
              </Paper>
            ))}
          </Box>
          {/*END Questions */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={() => {
                getCurrentQuestion();
              }}
              size="large"
              sx={{
                background: grey[200],
                color: teal[400],
                '&:hover': {
                  background: grey[300],
                },
              }}
            >
              <Typography variant="h6">Skip question</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    )
}

export default QuizMath;