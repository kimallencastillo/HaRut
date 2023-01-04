import { Link , useParams} from 'react-router-dom';
import React, { useRef, useState } from "react";
import { Box, Button, Icon, LinearProgress, Paper, Switch, Typography, } from '@mui/material';
import useSound from 'use-sound';
import harut from './logo.png';
import letsplay from '../music/letsplay.mp3';
import testhand from '../anims/testhand.gif'

import titleSound from '../music/harut.mp3';
import testG from '../music/testG.mp3';
import highscore from '../music/highscore.mp3';
/*
import MenuBg from '../music/quizBg.mp3';
import Sound from 'react-sound';
import ReactAudioPlayer from 'react-audio-player';
*/
const Menu = ({data}) => {
    // const params = new Proxy(new URLSearchParams(window.location.search), {
    //     get: (searchParams, prop) => searchParams.get(prop),
    //   });
    const {name, age} = useParams();
    
    // const {name} = useParams()
    // const {age } = useParams()
    // console.log(name , age)
    // console.log(useParams())
    /*const PlaySound = (
        handleSongLoading,
        handleSongPlaying,
        handleSongFinishedPlaying,
        
    ) => {}
     <h1>Age, { age }</h1>
    */
    //const [play, setPlay] = useState(true)
    const [play, { stop }] = useSound(letsplay);
    const letsPlay = () =>{
        const audio = new Audio(letsplay);
        audio.play();
        console.log("Working");
    }
    const titleFx =()=> {
        const audio = new Audio(titleSound);
      audio.play()
    }
    const gesture =()=> {
        const audio = new Audio(testG);
      audio.play()
    }
    const score =()=> {
        const audio = new Audio(highscore);
      audio.play()
    }
  
        
    
  
    
    return (
      
          <header className="App-header">
            <div className="container">
                <div id="home" className="flex-column flex-center">
                    <img src={harut} style={{
                        width: '600',
                        height: '500'
                    }} alt="logo" className="title-image" onMouseOver={titleFx} />
                    <h1 className="title-image" >HELLO, { name }!!</h1>
                    
                        <Link to={{
                            pathname: "/category",
                            search: `?name=${ name }&age=${ age }`
                        }} className="btn" onFocus={letsPlay}>Let's Play!!</Link>
                         <Link to= {`/testGesture/${name}/${age}`} id="test-btn" className="btn" onFocus={gesture} >
                         <Icon type={testhand}/>
                           Test Gestures</Link> 
                        <Link to= {`/scoreBoard/${name}/${age}`} id="highscore-btn" className="btn" onFocus={score}>High Scores<i className="fas fa-crown"></i></Link> 
                        <br/><br/>    
                    </div>
                </div>
            </header>
      
    );
}
export default Menu;