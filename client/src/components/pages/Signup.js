import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import M  from "materialize-css";
const Signup = () => {
   const history = useHistory();
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmpassword, setConfirmPassword] = useState("");
   const [visibile, setVisibile] = useState(false);
  
  const postData = () => {
   if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html : "Invalid email!", classes:"#d32f2f red darken-2"})
   }
   else {
   fetch("/signup", {
      method : "post",
      headers : {
         "Content-Type" : "application/json"
      },
      body : JSON.stringify({
         name,
         email,
         password,
         confirmpassword
      })
   }).then(res => res.json())
   .then(data => {
      if(data.error){
         M.toast({html : data.error, classes:"#d32f2f red darken-2"})
      }
      else{
         M.toast({html : data.message, classes:"#66bb6a green lighten-1"})
         history.push('/signin');
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
             placeholder = "name" 
             value = {name}
             onChange ={ (event) => setName(event.target.value)}
          />
          <input 
             type = "text"
             placeholder = "email" 
             value = {email}
             onChange ={ (event) => setEmail(event.target.value)}
          />
          <input 
             type = {visibile?"text":"password"}
             placeholder = "password" 
             value = {password}
             onChange ={ (event) => setPassword(event.target.value)}
          />
             <i onClick = {()=>{setVisibile(prev => !prev)}}
                 className="material-icons visible">
                {visibile?"visibility" : "visibility_off" }
                </i> 
           <input 
             style = {{position:"relative", bottom:"29px"}}
             type = {visibile?"text":"password"}
             placeholder = "confirm password" 
             value = {confirmpassword}
             onChange ={ (event) => setConfirmPassword(event.target.value)}
          />
           <i onClick = {()=>{setVisibile(prev => !prev)}}
                 className="material-icons visible1">
                {visibile?"visibility" : "visibility_off" }
                </i> 
           <button onClick = {postData} 
            className="btn waves-effect waves-light #ffc107 amber">Sign Up
           </button>
           <h5>
             <Link className="links" to="/signin">Already have an account ?</Link>
             </h5>

        </div>
    </div>
    )
}

export default Signup;