// npm install
// npm install fingerpose
// npm install css-loader --save-dev
// npm install react-router-dom@5

//import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

import Menu from './form/Menu';
import Form from './form/StartForm';
//form
import Quiz from './form/Quiz'
import Score from './form/Score'
import ScoreBoard from './form/ScoreBoard'
import TestGesture from './Play/testGesture'
// CSS
import './App.css';
import React, { useRef, useState, useEffect } from "react";
import {BrowserRouter , Routes,Route, useParams } from 'react-router-dom';
import { Link , useNavigate} from 'react-router-dom';
import { history } from './utils/history';
import { Box, Button, LinearProgress, Paper, Switch, Typography, } from '@mui/material';
import { deepPurple, grey, teal, green, red, blue } from '@mui/material/colors';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Container } from '@mui/system';
import NavBar from './components/header';
// Subjects 
import Quiz_Math from './form/subject/math/Quiz_Math';
import Quiz_Scie from './form/subject/science/QuizScie';
import QuizHistory from './form/subject/history/QuizHistory';
import Quiz_Eng from './form/subject/english/QuizEng';

// Math Mode
import EasyQuiz_Math from './form/subject/math/EasyQuiz_Math';
import MedQuiz_Math from './form/subject/math/MedQuiz_Math';

// Science Mode
import EasyQuizScie from './form/subject/science/EasyQuizScie';
import MedQuizScie from './form/subject/science/MedQuizScie';

// Science Mode
import EasyQuizEng from './form/subject/english/EasyQuizEng';
import MedQuizEng from './form/subject/english/MedQuizEng';

// Sounds
import useSound from 'use-sound';
import MathFx from './music/math.mp3';
import EngFx from './music/english.mp3';
import ScieFx from './music/science.mp3';
import catgFx from './music/Selcatg.mp3';
import selcDif from './music/selectDifficulty.mp3';

import mathTitle from './music/mathTitle.mp3';
import englishTitle from './music/englishTitle.mp3';
import scienceTitle from './music/scienceTitle.mp3';
import easyMode from './music/easyMode.mp3';
import averageMode from './music/averageMode.mp3';
import hardMode from './music/hardMode.mp3';
import back from './music/back.mp3';

// Menu
function App() {
  const currentPage = window.location.pathname;

  return (
    <div className="App">   
      <header className="App-header">
      
      <NavBar />
      <Container sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' , }}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Form/>} />
            <Route path="/menu/:name/:age" element={<Menu />} />
            <Route path="/category" element={<Category />} />
            <Route path="/scoreBoard/:name/:age" element={<ScoreBoard/>}/>
            <Route path="/math" element={<MathQuiz/>}/>
            <Route path="/quizMath" element={<Quiz_Math/>} />
            <Route path="/score" element={<Score/>}/>
            <Route path="/science" element={<ScieQuiz />}/>
            <Route path="/history" element={<HistoryQuiz/>}/>
            <Route path="/quizScie" element={<Quiz_Scie />} />
            <Route path="/quizHistory" element={<QuizHistory/>} />
            <Route path="/quizEng" element={<EnglishQuiz/>} />
            <Route path='/quizEnglish' element={<Quiz_Eng/>} />
            <Route path='/testGesture/:name/:age' element={<TestGesture/>} />
            <Route path='/easyQuiz_Math' element={<EasyQuiz_Math/>} />
            <Route path="/medQuiz_Math" element={<MedQuiz_Math/>} />
            <Route path='/easyQuizEng' element={<EasyQuizEng/>} />
            <Route path="/medQuizEng" element={<MedQuizEng/>} />
            <Route path='/easyQuizScie' element={<EasyQuizScie/>} />
            <Route path="/medQuizScie" element={<MedQuizScie/>} />
            <Route path="*" element={<p>ERROR NOT FOUND</p>} />
        </Routes>
      </BrowserRouter>
      </Container>
      
      </header>
    </div>
  );
}


// category //
const Category = () => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const name = params.name;
  const age  = params.age;
  const historyParam = useNavigate();
  function goHome(){
    historyParam( `/menu/${name}/${age}`, {replace: `${name}/${age}`})

  }

  // Math Sound
  const mthFx = () =>{
    const audio = new Audio(MathFx);
    audio.play();
    console.log("Working");
  }

  // English Sound
  const engFx = () =>{
    const audio = new Audio(EngFx);
    audio.play();
  
  }

  // Science Sound
  const scieFx = () =>{
    const audio = new Audio(ScieFx);
    audio.play();
  
  }
  
  // Science Sound
  const catgFxSound = () =>{
    const audio = new Audio(catgFx);
    audio.play();
   
  }

  // Science Sound
  const backFxSound = () =>{
    const audio = new Audio(back);
    audio.play();
  
  }

  const [count, setCount] = useState(0);
  const [soundState, setsoundState] = useState(false);

  
    return (
      <nav className="catg">
        <div className="container">
          <div id="home" className="flex-column flex-center">
            <h1 className="title-image" onMouseEnter={catgFxSound} >Subject Category</h1>
              <Link to={{
                          pathname: "/math",
                          search: `?name=${ name }&age=${ age }`
                        }} className="btn-math" onFocus={mthFx} > Math </Link>
              <Link to={{
                          pathname: "/science",
                          search: `?name=${ name }&age=${ age }`
                        }} className="btn-scie" onFocus={scieFx} > Science </Link>
              <Link to={{
                          pathname: "/quizEng",
                          search: `?name=${ name }&age=${ age }`
                        }} className="btn-his" onFocus={engFx} > English </Link>  

                        
                <button onClick={goHome} className="btn-accept"
                style={{
                  marginTop: "55px"
                }} onFocus={backFxSound}>Back<i className="fas fa-home"></i></button>  
          </div>
        </div>
      </nav>
    );
}

// Subjects //

// English
const EnglishQuiz = (props) => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const name = params.name;
  const age  = params.age;

  const [newAge, setNewAge] = useState(age)
  const [newName, setName] = useState(name);
  const [mode, setMode] = useState("RECOMMENDED");
  const [selectDifficulty] = useSound(selcDif);
  const [easyFx] = useSound(easyMode);
  const [averageFx] = useSound(averageMode);
  const [hardFx] = useSound(hardMode);
  const [engSound] = useSound(englishTitle);
  const [backSound] = useSound(back);
  return (
    <nav className="mode">  
      <div className="container_quiz">
        <div id="home" className="flex-column flex-center">
          <h1 className="title-image" onMouseEnter={engSound}>English</h1>
          <h1 className="title-image" onMouseEnter={selectDifficulty}>Select Difficulty</h1>
            <div className="level-container">
            <Link to={{
              pathname: "/easyQuizEng",
              search: `?mode=${ "easy" }&name=${ newName }&age=${ newAge }&subject=${ "english"}`
            }} 
            style={{ background: (newAge <= 8) ? "#4CBB17" : red[400]  }}
            className="btn-easy" onFocus={easyFx} > Easy </Link> 

            {(newAge <= 8) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            />{ mode } </span>}
            </div>

            <div className="level-container" >
            <Link to={{
              pathname: "/medQuizEng",
              search: `?mode=${ "medium" }&name=${ newName }&age=${ newAge }&subject=${ "english"}`
            }} 
            style={{ backgroundColor: (newAge >= 9  && newAge <= 12  ) ? "#4CBB17" : red[400]  }}
            className="btn-med" onFocus={averageFx}> Average  </Link>
            {(newAge >= 9  && newAge <= 12) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            /> { mode } </span>}
            </div>

            <div className="level-container">
            <Link to={{
              pathname: "/quizEnglish",
              search: `?mode=${ "hard" }&name=${ newName }&age=${ newAge }&subject=${ "english"}`
            }}
            style={{ backgroundColor: (newAge >= 13) ? "#4CBB17" : red[400] }}
            className="btn-hard" onFocus={hardFx}> Difficult </Link>
            {(newAge >= 13) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            />{ mode } </span>}
            </div>
            <Link to={{
                          pathname: "/category",
                          search: `?name=${ name }&age=${ age }`
                        }} className="btn-accept"
                style={{
                  marginTop: "55px"
                }} onFocus={backSound}>Back<i className="fas fa-home"></i></Link>  
            </div>
        </div>
    </nav>
  );
}

// Math //
const MathQuiz = (props) => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const name = params.name;
  const age  = params.age;

  const [newAge, setNewAge] = useState(age)
  const [newName, setName] = useState(name);
  const [mode, setMode] = useState("RECOMMENDED");
  const [selectDifficulty] = useSound(selcDif);
  const [mathSound] = useSound(mathTitle);
  const [easyFx] = useSound(easyMode);
  const [averageFx] = useSound(averageMode);
  const [hardFx] = useSound(hardMode);
  const [backSound] = useSound(back);
  return (
    <nav className="mode">  
      <div className="container_quiz">
        <div id="home" className="flex-column flex-center">
          <h1 className="title-image" onMouseEnter={mathSound}>MATH</h1>
          <h1 className="title-image" onMouseEnter={selectDifficulty}>Select Difficulty</h1>
            <div className="level-container">
            <Link to={{
              pathname: "/easyQuiz_Math",
              search: `?mode=${ "easy" }&name=${ newName }&age=${ newAge }&subject=${ "math"}`
            }} 
            style={{ background: (newAge <= 8) ? "#4CBB17" : red[400]  }}
            className="btn-easy" onFocus={easyFx} > Easy </Link> 

            {(newAge <= 8) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            />{ mode } </span>}
            </div>

            <div className="level-container" >
            <Link to={{
              pathname: "/MedQuiz_Math",
              search: `?mode=${ "medium" }&name=${ newName }&age=${ newAge }&subject=${ "math"}`
            }} 
            style={{ backgroundColor: (newAge >= 9  && newAge <= 12  ) ? "#4CBB17" : red[400]  }}
            className="btn-med" onFocus={averageFx} > Average  </Link>
            {(newAge >= 9  && newAge <= 12) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            /> { mode } </span>}
            </div>

            <div className="level-container">
            <Link to={{
              pathname: "/quizMath",
              search: `?mode=${ "hard" }&name=${ newName }&age=${ newAge }&subject=${ "math"}`
            }}
            style={{ backgroundColor: (newAge >= 13) ? "#4CBB17" : red[400] }}
            className="btn-hard" onFocus={hardFx} > Difficult </Link>
            {(newAge >= 13) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            />{ mode } </span>}
            </div>
            <Link to={{
                          pathname: "/category",
                          search: `?name=${ name }&age=${ age }`
                        }} className="btn-accept"
                style={{
                  marginTop: "55px"
                }} onFocus={backSound}>Back<i className="fas fa-home"></i></Link>  
            
        </div>
      </div>
    </nav>
  );
}

// Science //

const ScieQuiz = (props) => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const name = params.name;
  const age  = params.age;

  const [newAge, setNewAge] = useState(age)
  const [newName, setName] = useState(name);
  const [mode, setMode] = useState("RECOMMENDED");
  const [selectDifficulty] = useSound(selcDif);
  const [scieSound] = useSound(scienceTitle);
  const [easyFx] = useSound(easyMode);
  const [averageFx] = useSound(averageMode);
  const [hardFx] = useSound(hardMode);
  const [backSound] = useSound(back);
  return (
    <nav className="mode">  
      <div className="container_quiz">
        <div id="home" className="flex-column flex-center">
          <h1 className="title-image" onMouseEnter={scieSound}>SCIENCE</h1>
          <h1 className="title-image" onMouseEnter={selectDifficulty}>Select Difficulty</h1>
            <div className="level-container">
            <Link to={{
              pathname: "/easyQuizScie",
              search: `?mode=${ "easy" }&name=${ newName }&age=${ newAge }&subject=${ "science"}`
            }} 
            style={{ background: (newAge <= 8) ? "#4CBB17" : red[400]  }}
            className="btn-easy" onFocus={easyFx} > Easy </Link> 

            {(newAge <= 8) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            />{ mode } </span>}
            </div>

            <div className="level-container" >
            <Link to={{
              pathname: "/medQuizScie",
              search: `?mode=${ "medium" }&name=${ newName }&age=${ newAge }&subject=${ "science"}`
            }} 
            style={{ backgroundColor: (newAge >= 9  && newAge <= 12  ) ? "#4CBB17" : red[400]  }}
            className="btn-med" onFocus={averageFx} > Average  </Link>
            {(newAge >= 9  && newAge <= 12) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            /> { mode } </span>}
            </div>

            <div className="level-container">
            <Link to={{
              pathname: "/quizScie",
              search: `?mode=${ "hard" }&name=${ newName }&age=${ newAge }&subject=${ "science"}`
            }}
            style={{ backgroundColor: (newAge >= 13) ? "#4CBB17" : red[400] }}
            className="btn-hard" onFocus={hardFx} > Difficult </Link>
            {(newAge >= 13) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            />{ mode } </span>}
            </div>
            <Link to={{
                          pathname: "/category",
                          search: `?name=${ name }&age=${ age }`
                        }} className="btn-accept"
                style={{
                  marginTop: "55px"
                }} onFocus={backSound}>Back<i className="fas fa-home"></i></Link>  
            
        </div>
      </div>
    </nav>
  );
}

// History //

const HistoryQuiz = (props) => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const name = params.name;
  const age  = params.age;

  const [newAge, setNewAge] = useState(age)
  const [newName, setName] = useState(name);
  const [mode, setMode] = useState("RECOMMENDED")
  return (
    <nav className="mode">  
      <div className="container_quiz">
        <div id="home" className="flex-column flex-center">
          <h1>HISTORY</h1>
          <h1>Select Difficulty</h1>
            <div className="level-container">
            <Link to={{
              pathname: "/quizHistory",
              search: `?mode=${ "easy" }&name=${ newName }&age=${ newAge }`
            }} 
            style={{ background: (newAge <= 8) ? "#4CBB17" : red[400]  }}
            className="btn-easy"> Easy </Link> 

            {(newAge <= 8) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            />{ mode } </span>}
            </div>

            <div className="level-container" >
            <Link to={{
              pathname: "/quizHistory",
              search: `?mode=${ "medium" }&name=${ newName }&age=${ newAge }`
            }} 
            style={{ backgroundColor: (newAge >= 9  && newAge <= 12  ) ? "#4CBB17" : red[400]  }}
            className="btn-med"> Medium </Link>
            {(newAge >= 9  && newAge <= 12) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            /> { mode } </span>}
            </div>

            <div className="level-container">
            <Link to={{
              pathname: "/quizHistory",
              search: `?mode=${ "hard" }&name=${ newName }&age=${ newAge }`
            }}
            style={{ backgroundColor: (newAge >= 13) ? "#4CBB17" : red[400] }}
            className="btn-hard"> Hard </Link>
            {(newAge >= 13) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            />{ mode } </span>}
            </div>

        </div>
      </div>
    </nav>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
