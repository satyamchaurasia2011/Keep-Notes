import React, { useEffect} from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";
import './App.css';
import Home from './components/pages/Home';
import Signup from "./components/pages/Signup";
import Signin from './components/pages/Signin'
import { useDispatch } from "react-redux";
import { saveUser } from "./features/userSlice";
const Routing = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"))
      if(user){
        dispatch(saveUser(user)) 
      } else{
        history.push('/signin')
      }
    },[])
    return (
      <Switch>
         <Route path='/' exact component = {Home} />
         <Route path='/signup' component = {Signup} />
         <Route path='/signin' component = {Signin} />
      </Switch>
    )
  }
  const App = () => {
    
  return (
      <BrowserRouter>
      <Header />
    
      <Routing />

      <Footer />
      </BrowserRouter>
   
  );
}

export default App;
