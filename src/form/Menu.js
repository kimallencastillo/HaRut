import { Link , useParams} from 'react-router-dom';
import harut from './logo.png';

const Menu = ({data}) => {
    // const params = new Proxy(new URLSearchParams(window.location.search), {
    //     get: (searchParams, prop) => searchParams.get(prop),
    //   });
    const {name, age} = useParams()
    // const {name} = useParams()
    // const {age } = useParams()
    // console.log(name , age)
    // console.log(useParams())
    

    return (
        <nav className="menu">
          <header className="App-header">
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
                        <Link to="/scoreBoard" id="highscore-btn" className="btn">High Scores<i className="fas fa-crown"></i></Link>     
                        
                    </div>
                </div>
            </header>
        </nav>
  
    );
}
export default Menu;