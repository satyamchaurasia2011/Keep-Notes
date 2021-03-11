import React,{useContext} from 'react'
import { Link, useHistory } from "react-router-dom";
import { UserContext } from '../../App';

const Header = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext);
  const renderList = () => {
    if(state){
        return [
          <li key="5">
          <button 
          onClick = {() => {
            localStorage.clear()
            dispatch({type : "CLEAR"})
            history.push('/signin');
          }} 
          style={{backgroundColor:"#f29c00"}}
          className="btn">Logout
           </button>
          </li>
        ]
    }else{
      return [
        <li key="6"><Link to="/signin">SignIn</Link></li>,
        <li key="7"><Link to="/signup">SignUp</Link></li>
      ]
    }
  }
    return (
        <div>
        <nav className="navbar12">
        <div className="nav-wrapper">
          <Link to={state?"/":"/signin"} className="brand-logo left">Keep Notes</Link>
          <ul id="nav-mobile" className="right" style={{marginRight:"43px"}}>
           {renderList()}
          </ul>
        </div>  
      </nav>
      </div>
            
    )
}
export default Header;