

import { blue } from "material-ui-colors";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './scoreboard.css'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
// https://react-bootstrap.github.io/components/table/
const ScoreBoard = ({data}) => {

    const { name, age} = useParams();   
    const historyParam = useNavigate();
     var scoreBoard = JSON.parse(localStorage.getItem('scores') || "[]");
    let scoreBoards = []

    let sortStuff = (scoreBoard)  => {
        return scoreBoard.sort((a, b) => {
            scoreBoards = b.playerScore - a.playerScore;
        
            return b.playerScore - a.playerScore;
        });
    }
    function goHome(){
        historyParam( `/menu/${name}/${age}`, {replace: `${name}/${age}`})

    }
    console.log("sort :", sortStuff(scoreBoard))
    var rank = 1;
    //<a href="/" className="btn_1">Go Home<i className="fas fa-home"></i></a>      
    return (
        <div className="container">   
            <h1>SCOREBOARD</h1>                    
            {/* table */}
            <table className="table table-bordered table-dark" >
                <thead>
                <tr>
                    <th>RANK</th>
                    <th>Player Name</th>
                    <th>SCORE</th>
                </tr>
                </thead>
                <tbody>
                {sortStuff(scoreBoard).map((scores, index) => (
                    <tr key={index === 0 ? (index++): (index) }>
                        <td>{rank++}</td>
                        <td>{scores.playerName}</td>
                        <td>{scores.playerScore}</td>   
                    </tr>                
                ))} 
                </tbody>
                </table>
                <br/><br/>         
                <button onClick={goHome} className="btn-accept">Go Home<i className="fas fa-home"></i></button>  
                      
                </div>
    )
}
export default ScoreBoard;