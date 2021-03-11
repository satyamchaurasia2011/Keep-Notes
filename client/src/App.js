import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";
import './App.css';
import Home from './components/pages/Home';
import {reducer, initialState} from './components/reducers/UserReducer';
import Signup from "./components/pages/Signup";
import Signin from './components/pages/Signin'
export const UserContext = createContext()
 
const Routing = () => {
    const history = useHistory();
    const {state, dispatch} = useContext(UserContext)
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"))
      if(user){
        dispatch({type : "USER", payload:user}) 
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
    const [state, dispatch] = useReducer(reducer, initialState)
  return (
      <UserContext.Provider value = {{state, dispatch}}>
      <BrowserRouter>
      <Header />
    
      <Routing />

      <Footer />
      </BrowserRouter>
      </UserContext.Provider>
   
  );
}

export default App;
