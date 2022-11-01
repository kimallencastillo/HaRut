
const Form = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(22);
  
    function form() {
      if(name === "" ) {
        alert("No Name Input!!");
      } else {
        history.push({ pathname: '/menu', search: `?name=${ name }&age=${ age }` });
        history.go(0);
      }
    }
    return (
      <div className="container">
          <div id="highScores" className="flex-center flex-column">
              <h1>FORM </h1>
              <span className="scores-h2">
              <h2 >Enter your name and Age</h2>
              </span>
              { /* Save Score */ }
              <input type="text" className="score-name" placeholder='Enter your Name ...' value={name} onChange={(e)=>{setName(e.target.value)}} />
              
              <br/>
              <button className="btn" onClick={form} > Submit </button>
          </div>
      </div>
    )
  }