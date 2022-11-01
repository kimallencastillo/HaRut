

import { blue } from "material-ui-colors";
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import './scoreboard.css'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
// https://react-bootstrap.github.io/components/table/
function scoreBoard () {


    var scoreBoard = JSON.parse(localStorage.getItem('scores') || "[]");
    let scoreBoards = []

    let sortStuff = (scoreBoard)  => {
        return scoreBoard.sort((a, b) => {
            scoreBoards = b.playerScore - a.playerScore;
        
            return b.playerScore - a.playerScore;
        });
    }
    console.log("sort :", sortStuff(scoreBoard))
    var rank = 1;
    return (
        <div className="app">   
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
                <a href="/" className="btn_1">Go Home<i className="fas fa-home"></i></a>            
                </div>
    )
}
export default scoreBoard;