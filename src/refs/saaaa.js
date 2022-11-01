<>
<Webcam 
className="webcam"
ref = { webcamRef }
style = {
{
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: 600,
    right: 0,
    top: 40,
    textAlign: "center",
    zindex: 9,
    width: 340,
    height: 240,
    border: 150,
}
}
/>
<canvas 
ref = { canvasRef }
style = {
{
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: 600,
    right: 0,
    top: 40,
    textAlign: "center",
    zindex: 9,
    width: 340,
    height: 240,
    border: 150,
}
}
/>
{emoji && (
  <Box
    sx={{
      right: '15px',
      bottom: '15px',
      background: teal[1900],
      borderRadius: '10px',
      position: 'absolute',
      aspectRatio: '1/1',
      transition: 'all 0.5s ease',
      zIndex: 3,
    }}
  >
    <img
      src={images[emoji]}
      style={{
        height: `${height / 3}px`,
        width: 'auto',
      }}
    />
  </Box>
)}
</>
<div className="container">
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
<h1 id="question"> {questions[currentQuestion].questionText}</h1>
{questions[currentQuestion].answerOptions.map((list, index) => (
    <Paper 
    className="choice-container"  
    key={index}
    sx={{
        mb: 1,
        p: 2,
        background: showCorrectAns
        ? list.isCorrect
            ? blue[700]
            : red[700]
        : showSelectAns
        ? gestureValue - 1 === index
            ? deepPurple[700]
        : deepPurple[500]
      : deepPurple[500],
        color: grey[50],
        display: 'flex',
        alignItems: 'center',    
    }}
    >
        {list.symbol}
    <p className="choice-text">
        {list.answerText}
    </p>
 
  </Paper>
))}
</div>
</div>