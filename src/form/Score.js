import { useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
//import { history } from '../utils/history';

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
    const historyParam = useNavigate();
    const [name, setName] = useState(userName);
    //const [isFormVisible, setIsFormVisible] = useState(true);
    let SaveScore = false;
    
    /*
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
    return (
        <>
        <div style={{marginTop: "100px"}}></div>
        <div className="container">
            <div id="highScores" className="flex-center flex-column">
                <h1>{score} </h1>
                <span className="scores-h2">
                <h2 >Enter your name below to save your score!</h2>
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
                        }} className="btn">Play Again</Link>
                <a href="/" className="btn">Go Home<i className="fas fa-home"></i></a>  
            
            </div>
        </div>
         
        </>
        )
}

export default Score;