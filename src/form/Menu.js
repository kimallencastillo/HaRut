import { Link , useParams} from 'react-router-dom';
import React, { useRef, useState } from "react";
import harut from './logo.png';
import MenuBg from '../music/quizBg.mp3';
import Sound from 'react-sound';
const Menu = ({data}) => {
    // const params = new Proxy(new URLSearchParams(window.location.search), {
    //     get: (searchParams, prop) => searchParams.get(prop),
    //   });
    const {name, age} = useParams()
    // const {name} = useParams()
    // const {age } = useParams()
    // console.log(name , age)
    // console.log(useParams())
    /*const PlaySound = (
        handleSongLoading,
        handleSongPlaying,
        handleSongFinishedPlaying,
        
    ) => {}
    */
    const [play, setPlay] = useState(true)
    return (
        <nav className="menu">
          <header className="App-header">
            <button onClick={() => setPlay(!play)} >{!play ? 'Play' :'Stop'}</button>
            <Sound 
            url={MenuBg}
            playStatus={
                play ? Sound.status.PLAYING : Sound.status.STOP
            }
            playFromPosition={300}

            />
            <div className="container">
                <div id="home" className="flex-column flex-center">
                    <img src={harut} style={{
                        width: '600',
                        height: '500'
                    }} alt="logo" />
                    <h1>HELLO, { name }</h1>
                    <h1>Age, { age }</h1>
                        <Link to={{
                            pathname: "/category",
                            search: `?name=${ name }&age=${ age }`
                        }} className="btn">Play</Link>
                        <Link to= {`/scoreBoard/${name}/${age}`} id="highscore-btn" className="btn">High Scores<i className="fas fa-crown"></i></Link>     
                        
                    </div>
                </div>
            </header>
        </nav>
  
    );
}
export default Menu;