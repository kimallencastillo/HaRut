


<div className="container">
<div id="game" className="justify-center flex-column">
    <div id="hud">
        <div className="hud-item">
            <p id="progressText" className="hud-prefix">
                Question
            </p>
            <div id="progressBar">
                <div id="progressBarFull"></div>
            </div>
        </div>
        <div className="hud-item">
            <p className="hud-prefix">
                Score
            </p>
            <h1 className="hud-main-text" id="score">
                0
            </h1>
        </div>
    </div>
    <h1 id="question">What is the answer to this question</h1>
    <div className="choice-container">
      <img src={victory} id="choice" value={victory} style={{width: 80, height: 50, marginLeft: 5, marginTop: 5}} alt="img"/>
      <p className="choice-text"  value="IASHDHASHJ" id="k"  data-number="1">Choice 1</p>
    </div>
    <div className="choice-container">
    <img src={love_you} id="choice" value={love_you} style={{width: 80, height: 50, marginLeft: 5, marginTop: 5}} alt="img"/>
        <p className="choice-text" data-number="2">Choice 2</p>
    </div>
    <div className="choice-container">
    <img src={call_me} id="choice" value={call_me} style={{width: 80, height: 50, marginLeft: 5, marginTop: 5}} alt="img"/>
        <p className="choice-text" data-number="3">Choice 3</p>
    </div>
    <div className="choice-container">
    <img src={thumbs_up} id="choice" value={thumbs_up} style={{width: 80, height: 50, marginLeft: 5, marginTop: 5}} alt="img"/>
        <p className="choice-text" data-number="4">Choice 4</p>
    </div>
</div>









<div id="game" className="justify-center flex-column">
            <div id="hud">
                <div className="hud-item">
                    <p id="progressText" className="hud-prefix">Question</p>
                <div id="progressBar" variant="determinate"
                value={((currentQuestion + 1) / questions.length) * 100}>
                    
                </div>
                </div>
                <div className="hud-item">
                <p className="hud-prefix">Score</p>
                    <h1 className="hud-main-text" id="score">0</h1>
                </div>
            </div>
</div>
