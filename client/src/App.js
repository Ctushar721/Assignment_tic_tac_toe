import './App.css';
import React, {useState} from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Foo from "./components/testComp";
import {StreamChat, TokenManager} from "stream-chat";
import Cookies from "universal-cookie";
import { Chat } from "stream-chat-react";
import JoinGame from "./components/JoinGame";
import Home from './components/Home';
//if token wali line is used when user reloads, agar token hai toh it checks if it's right or not 
//login.js/signup.js on submit verifies and set is auth to be true

function App() {
  const cookies = new Cookies();
  const api_key = "5vh7wd3hwgx9";
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const [isAuth, setIsAuth] = useState(false);
  const [ShowSignUp, setShowSignUp] = useState(false);
  const [ShowLogin, setShowLogin] = useState(false);

  //this checking token part is common for login and signup
  if (token) {
    client.connectUser({
      id: cookies.get("userId"),
      Name: cookies.get("Name"),
      Email: cookies.get("Email"),
      hashedPassword: cookies.get("hashedPassword")
    }, token).then((user)=>{
      console.log("user")
      setIsAuth(true);
    },(reject)=>{console.log("wrong token/tampered token")});
  }
  function logout() {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("Name");
    cookies.remove("Email");
    cookies.remove("hashedPassword");
    client.disconnectUser();
    setIsAuth(false);
  }

  
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          <button onClick={logout}> Log Out</button>
        </Chat>
      ) : (
        <>
          {!ShowSignUp && !ShowLogin ? <Home setShowLogin={setShowLogin} setShowSignUp={setShowSignUp}/> : 
          (ShowSignUp ? (<SignUp setIsAuth={setIsAuth} />) : (<Login setIsAuth={setIsAuth} />))
        }
        </>
      )}
    </div>
  );
}

export default App;
