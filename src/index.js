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
//
import Quiz from './form/Quiz'
import Score from './form/Score'
import ScoreBoard from './form/ScoreBoard'
// CSS
import './App.css';
import React, { useRef, useState } from "react";
import {BrowserRouter , Routes,Route, useParams } from 'react-router-dom';
import { Link , useNavigate} from 'react-router-dom';
import { history } from './utils/history';
import { Box, Button, LinearProgress, Paper, Switch, Typography, } from '@mui/material';
import { deepPurple, grey, teal, green, red, blue } from '@mui/material/colors';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

// Subjects 
import Quiz_Math from './form/subject/math/Quiz_Math';
import Quiz_Scie from './form/subject/science/QuizScie';
import QuizHistory from './form/subject/history/QuizHistory';
import Quiz_Eng from './form/subject/english/QuizEng';
// Menu
function App() {
  const currentPage = window.location.pathname;
  //if(currentPage === '/') {
  //  history.push('/form');
  //  history.go(0)
  //}
  return (
    <div className="App">   
      <header className="App-header">
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
            <Route path="*" element={<p>ERROR NOT FOUND</p>} />
        </Routes>
      </BrowserRouter>
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
    return (
      <nav className="catg">
        <div className="container">
          <div id="home" className="flex-column flex-center">
            <h1>Subject Category</h1>
              <Link to={{
                          pathname: "/math",
                          search: `?name=${ name }&age=${ age }`
                        }} className="btn-math" > Math </Link>
              <Link to={{
                          pathname: "/science",
                          search: `?name=${ name }&age=${ age }`
                        }} className="btn-scie"> Science </Link>
              <Link to={{
                          pathname: "/quizEng",
                          search: `?name=${ name }&age=${ age }`
                        }} className="btn-his"> English </Link>  
          </div>
        </div>
      </nav>
    );
}

// Subjects //

// English
// Math //
const EnglishQuiz = (props) => {
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
          <h1>English</h1>
          <h1>Select Difficulty</h1>
            <div className="level-container">
            <Link to={{
              pathname: "/quizEnglish",
              search: `?mode=${ "easy" }&name=${ newName }&age=${ newAge }`
            }} 
            style={{ background: (newAge <= 8) ? green[900] : red[900]  }}
            className="btn-easy"> Easy </Link> 

            {(newAge <= 8) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            />{ mode } </span>}
            </div>

            <div className="level-container" >
            <Link to={{
              pathname: "/quizEnglish",
              search: `?mode=${ "medium" }&name=${ newName }&age=${ newAge }`
            }} 
            style={{ backgroundColor: (newAge >= 9  && newAge <= 12  ) ? green[900] : red[900]  }}
            className="btn-med"> Average  </Link>
            {(newAge >= 9  && newAge <= 12) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            /> { mode } </span>}
            </div>

            <div className="level-container">
            <Link to={{
              pathname: "/quizEnglish",
              search: `?mode=${ "hard" }&name=${ newName }&age=${ newAge }`
            }}
            style={{ backgroundColor: (newAge >= 13) ? green[900] : red[900] }}
            className="btn-hard"> Difficult </Link>
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

// Math //
const MathQuiz = (props) => {
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
          <h1>MATH</h1>
          <h1>Select Difficulty</h1>
            <div className="level-container">
            <Link to={{
              pathname: "/quizMath",
              search: `?mode=${ "easy" }&name=${ newName }&age=${ newAge }`
            }} 
            style={{ background: (newAge <= 8) ? green[900] : red[900]  }}
            className="btn-easy"> Easy </Link> 

            {(newAge <= 8) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            />{ mode } </span>}
            </div>

            <div className="level-container" >
            <Link to={{
              pathname: "/quizMath",
              search: `?mode=${ "medium" }&name=${ newName }&age=${ newAge }`
            }} 
            style={{ backgroundColor: (newAge >= 9  && newAge <= 12  ) ? green[900] : red[900]  }}
            className="btn-med"> Average  </Link>
            {(newAge >= 9  && newAge <= 12) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            /> { mode } </span>}
            </div>

            <div className="level-container">
            <Link to={{
              pathname: "/quizMath",
              search: `?mode=${ "hard" }&name=${ newName }&age=${ newAge }`
            }}
            style={{ backgroundColor: (newAge >= 13) ? green[900] : red[900] }}
            className="btn-hard"> Difficult </Link>
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

// Science //

const ScieQuiz = (props) => {
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
          <h1>SCIENCE</h1>
          <h1>Select Difficulty</h1>
            <div className="level-container">
            <Link to={{
              pathname: "/quizScie",
              search: `?mode=${ "easy" }&name=${ newName }&age=${ newAge }`
            }} 
            style={{ background: (newAge <= 8) ? green[900] : red[900]  }}
            className="btn-easy"> Easy </Link> 

            {(newAge <= 8) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            />{ mode } </span>}
            </div>

            <div className="level-container" >
            <Link to={{
              pathname: "/quizScie",
              search: `?mode=${ "medium" }&name=${ newName }&age=${ newAge }`
            }} 
            style={{ backgroundColor: (newAge >= 9  && newAge <= 12  ) ? green[900] : red[900]  }}
            className="btn-med"> Average  </Link>
            {(newAge >= 9  && newAge <= 12) && <span 
            ><ArrowCircleLeftIcon
            className='level-container-icon' 
            /> { mode } </span>}
            </div>

            <div className="level-container">
            <Link to={{
              pathname: "/quizScie",
              search: `?mode=${ "hard" }&name=${ newName }&age=${ newAge }`
            }}
            style={{ backgroundColor: (newAge >= 13) ? green[900] : red[900] }}
            className="btn-hard"> Difficult </Link>
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
            style={{ background: (newAge <= 8) ? green[900] : red[900]  }}
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
            style={{ backgroundColor: (newAge >= 9  && newAge <= 12  ) ? green[900] : red[900]  }}
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
            style={{ backgroundColor: (newAge >= 13) ? green[900] : red[900] }}
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
