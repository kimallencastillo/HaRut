import React, { useState, useEffect } from "react";
import { Link, useNavigate} from 'react-router-dom';
//import { history } from '../utils/history';
//import Confetti from 'react-dom-confetti';
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import hooray from '../music/hooray.mp3'
import { useAudio } from 'react-use';
import useSound from 'use-sound';
import { Box, Button, LinearProgress, Paper, Switch, Typography, } from '@mui/material';
import { deepPurple, grey, teal, green, red, blue, orange } from '@mui/material/colors';
import click from '../music/click.mp3';
import back from '../music/back.mp3';
import submit from '../music/submit.mp3';
/* Questions */ 

// Math Question
import { easyMathQuestions } from './showresult/math/Easy';
import { medMathQuestions } from './showresult/math/Medium';
import { hardMathQuestions } from './showresult/math/Hard';

// English Questions
import { easyEngQuestions } from './showresult/english/Easy';
import { medEngQuestions } from './showresult/english/Medium';
import { hardEngQuestions } from './showresult/english/Hard';

// Science Questions
import { easyScieQuestions } from './showresult/science/Easy';
import { medScieQuestions } from './showresult/science/Medium';
import { hardScieQuestions } from './showresult/science/Hard';

//import Form from './StartForm'
/* Get the score and the player name to localstorage */
//export default function Score() 
const Score = ({data}) =>{
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
    let score = params.score;
    let userName = params.name;
    let age = params.age;
    let playaudio = params.age;
    let mode = params.mode;
    let subject = params.subject;
    const historyParam = useNavigate();
    const [name, setName] = useState(userName);
    const [clickFx] = useSound(click);
    const [backFx] = useSound(back);
    const [submitFx] = useSound(submit);
    //const [isFormVisible, setIsFormVisible] = useState(true);
    let SaveScore = false;
    let setPlayAudio = false;
    setPlayAudio = playaudio;
    let questions = []
    if(subject === "" || mode === "") {
    } else {
        // check subject
        // Math
        if(subject === "math"){
            if(mode === "easy") {
                questions = easyMathQuestions;
            } else if(mode === "medium") {
                questions = medMathQuestions;
            } else if(mode === "hard") {
                questions = hardMathQuestions;
            }
        }
        // English
        if(subject === "english"){
            if(mode === "easy") {
                questions = easyEngQuestions;
            } else if(mode === "medium") {
                questions = medEngQuestions;
            } else if(mode === "hard") {
                questions = hardEngQuestions;
            }
        }
        // Science
        if(subject === "science"){
            if(mode === "easy") {
                questions = easyScieQuestions;
            } else if(mode === "medium") {
                questions = medScieQuestions;
            } else if(mode === "hard") {
                questions = hardScieQuestions;
            }
        }
    }
   
    /*
    if(mode === "easy") {
        questions = easyQuestions;
      } else if(mode === "medium") {
        questions = medQuestions;
      } else if(mode === "hard") {
        questions = hardQuestions;
      }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The Player name is: ${name} and the Score is: ${score} and the save data is: ${SaveScore}`);
      }
      if(name === null || name === ""){
        alert("No Name Input!!");
    }else {
        // save name and score in localStorage
        localStorage.setItem('score', score);
        localStorage.setItem('name', name);
        setSaveScore(true);

    }
    let s = localStorage.getItem('score');
    let n = localStorage.getItem('name');
    console.log("Player Name is : " , n , " And Score is: ", s, "and SaveScore: ", SaveScore);
    /*
    if(SaveScore) {
        let s = localStorage.getItem('score');
        let n = localStorage.getItem('name');
        console.log("Player Name is : " , n , " And Score is: ", s);
    } */
    function savePlayerScore(){
        if(name === null || name === "") {
            alert("No Name Input!!");
        } else {
        var ArrScores = JSON.parse(localStorage.getItem('scores') || "[]");
        var scores = {  playerScore : score , playerName : name}
        
        // set scores to ArrayScores
        ArrScores.push(scores);

        // set saveScore to true
        SaveScore = true;

        localStorage.setItem('scores', JSON.stringify(ArrScores));
        //alert("WORKING"); 
        }
        if(SaveScore) {
            
            alert("SUBMITTED"); 
            submitSound();
            /*history.push({ pathname: '/menu' });
            history.go(0);*/
            //setIsFormVisible(false);
            historyParam( `/menu/${name}/${age}`, {replace: `${name}/${age}`})

        }
    }
   // {isFormVisible ? (
   /*
   ) : (
            <Form />
            )
            }
    */

   // confetti
    const config = {
        angle: 90,
        spread: 360,
        startVelocity: 40,
        elementCount: 70,
        dragFriction: 0.12,
        duration: 3000,
        stagger: 3,
        width: "10px",
        height: "10px",
        perspective: "500px",
        colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
    };

    const { width, height } = useWindowSize()
    //const audio = new Audio(hooray);
    //audio.play()
    const [isExploding, setIsExploding] = React.useState(true);
    const submitSound = ()=> {
      const audio = new Audio(submit)
      audio.play()
    }
    const congrats = (congrats) =>{
        if(congrats){
            const audio = new Audio(hooray);
            audio.play()
        }else {

        }
    }
    // Play Audio
    useEffect(() => {
        congrats(setPlayAudio);
        console.log(questions);
      
    }, [setPlayAudio]);
    let ctr = 1;
    
    //const []

    // create a function for audio to play once only
    return (
        <>
        <div style={{marginTop: "50px"}}></div>
        <div className="container">
            <div id="highScores" className="flex-center flex-column">
                <h2 className="title-image">Congratulations You got!!</h2>
                <h1 className="title-image">{score} </h1>
                {isExploding && <Confetti active={ isExploding } config={ config }
                width={width}
                height={height}
                /> }
                <span className="scores-h2">
                <h2 className="title-image">Enter your name below to save your score!</h2>
                </span>
                { /* Save Score */ }
                <input type="text" className="score-name" style={{
                    textAlign: 'center'
                }} placeholder='Enter your Name ...' value={name} onChange={(e)=>{setName(e.target.value)}} />
                <br/>
                <button className="btn" onClick={savePlayerScore}> Submit </button>
              
                <Link to={{
                          pathname: "/category",
                          search: `?name=${ name }&age=${ age }`
                        }} className="btn" onFocus={clickFx} >Play Again</Link>
                <a href="/" className="btn" onFocus={backFx} >Go Home<i className="fas fa-home"></i></a>  
            
            </div>
        </div>

     
 
  
          
          {/* Question */}
  
         {/* End Question */}
         
        {/* Questions */}
        <Box sx={{ mt: 4 }}>
            {/* Question */}
              <h2 className='question-text'>Correct answers</h2> 
        </Box>
        <Box
          sx={{ mt: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}
        >
            
          {questions.map((option, index) => (
             
            <Paper
              className="choice-container"  
              key={index}
              sx={{
                mb: 1,
                p: 2,
                background: orange[700],
                display: 'flex',
                alignItems: 'center',
              }}
            >
          
            {/* Question */}

              <h2 className='question-text'>{ctr++}.) {option.questionText} </h2> 
          
   
            </Paper>
          ))}
        </Box>
    
        </>
        )
}

export default Score;

/*
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
                */