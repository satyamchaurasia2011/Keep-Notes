import React, {useState, useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M from 'materialize-css';
import {saveUser} from '../../features/userSlice'
import { useDispatch } from 'react-redux';

const Signin = () => {
   const history = useHistory();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [visibile, setVisibile] = useState(false);
   const dispatch = useDispatch()
   const postData = () => {
      if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
         M.toast({html : "Invalid email!", classes:"#d32f2f red darken-2"})
      }
      else {
      fetch("/signin", {
         method : "post",
         headers : {
            "Content-Type" : "application/json"
         },
         body : JSON.stringify({
            email,
            password
         })
      }).then(res => res.json())
      .then(data => {
         if(data.error){
            M.toast({html : data.error, classes:"#d32f2f red darken-2"})
         }
         else{
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch(saveUser(data.user))
            M.toast({html : "Successfully Signed in", classes:"#66bb6a green lighten-1"})
            history.push('/');
         }
      }).catch(err =>{
         console.log(err);
      })
     }
   }
    return (
       <div className="mycard">
           <div className = "card auth-card input-field">
           <h2>Keep Notes</h2>
             <input 
                type = "text"
                placeholder = "email" 
                value = {email}
                onChange = {(event) => setEmail(event.target.value)}
             />
             <input 
                type = {visibile?"text":"password"}
                placeholder = "password" 
                value = {password}
                onChange = {(event) => setPassword(event.target.value)}
                />
                <i style={{left:"200px"}} 
                onClick = {()=>{setVisibile(prev => !prev)}}
                 className="material-icons visible">
                {visibile?"visibility" : "visibility_off" }
                </i> 
              <button onClick = {postData}
              className="btn waves-effect waves-light #ffc107 amber">Sign In
              </button>
              <h5>
              <Link className="links" to="/signup">Don't have an account?</Link> 
              </h5>
            
           </div>
       </div>

    );
}

export default Signin;

