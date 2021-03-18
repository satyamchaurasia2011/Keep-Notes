import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { removeUser } from "../../features/userSlice";
import {selectUserData} from '../../features/userSlice'

const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(selectUserData)
  const renderList = () => {
    if(user){
        return [
          <li key="5">
          <button 
          onClick = {() => {
            localStorage.clear()
            dispatch(removeUser())
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
          <Link to={user?"/":"/signin"} className="brand-logo left">Keep Notes</Link>
          <ul id="nav-mobile" className="right" style={{marginRight:"43px"}}>
           {renderList()}
          </ul>
        </div>  
      </nav>
      </div>
            
    )
}
export default Header;