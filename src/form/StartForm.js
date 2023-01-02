import React, { useRef, useState } from "react";
import { createSearchParams, Link , useParams, useNavigate} from 'react-router-dom';
import harut from '../img/logo.png';
import { history } from '../utils/history';
import './StartForm.css';
import Menu from './Menu';
import useSound from 'use-sound';

// Sounds
import name from '../music/name.mp3'
import age from '../music/age.mp3'
import submitSFX from '../music/submit.mp3'
const Form = (props) => {
  const historyParam = useNavigate();
  
  const [enterName] = useSound(name);
  const [enterAge] = useSound(age);
  const [enterSubmitSFX] = useSound(submitSFX);
  const [details, setDetails] = useState({
    name: "",
    age: ""
  })
  let accountStatus = false;

  //const [isFormVisible, setIsFormVisible] = useState(true);
  const handleChange = (e) => {
    //console.log(e.target);
    const {name, value} = e.target;
    console.log(name, value);
    setDetails((prev)=> {
        return {...prev, [name]: value}
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details)
    //setIsFormVisible(false);
    const paramName = details.name;
    const paramAge = details.age;

    if( paramName === "" ) {
      alert("NO NAME INPUT!!")
    }else if ( paramAge === ""){
      alert("NO AGE INPUT!!")
    }
    else {
    //console.log("Name: -> ", paramName)
    //console.log("Age: -> ", paramAge)
    //history.push({ pathname: '/menu', search: `?name=${ paramName }&age=${ paramAge }`});
    //history.go(0);
    accountStatus = true;

    localStorage.setItem('account', JSON.stringify(accountStatus));
    localStorage.setItem('name', JSON.stringify(paramName));
    localStorage.setItem('age', JSON.stringify(paramAge));
    
    historyParam( `/menu/${paramName}/${paramAge}`, {replace: `${paramName}/${paramAge}`})
    } 
  }
  // audio
  /*const enterName = () =>{
    const audio = new Audio(name);
    audio.play();
    //console.log("Working");
  }*/
  let i = 0;
  /*const enterAge = () =>{
    const audio = new Audio(age);
    audio.play();
    //console.log("Working");
  }*/

  // <Link to={ `menu/${details.name}/${details.age}` } 
  //  className="btn-accept">Submit</Link>
    return (
          <div className="appForm" >
             <div className="container-form">
                <img src={harut} style={{
                        width: 600,
                        height: 700,
                        marginTop: 60
                    }} alt="logo" />
                  <div id="home" className="flex-column flex-center">
                       
                    <h1>WELCOME!!</h1>
                      <>{/*FORM START*/}</>
                        <form onSubmit={handleSubmit}>
                            <h3>Name : </h3> <input type="text" name='name' className="input-name" onChange={handleChange} placeholder="Name" onClick={enterName} />    
                            <h3>Age : </h3> <input type="number" name='age'
                            className="input-name" onChange={handleChange} onClick={enterAge} placeholder="age" /> 
                            <button className="btn-accept" onClick={enterSubmitSFX}> Submit </button>
                          
                    </form>
                </div>
              </div>
            </div>
      
    );
}


export default Form;