import React, {useState} from "react";
function Home({setShowLogin, setShowSignUp}) {
    function setLogin(){
        setShowLogin(true)
    }
    function setSignup(){
        setShowSignUp(true);
    }
    
    return (
    <div className="HomeComponent">
    <h1>Tic-Tac-Toe</h1>
      <button onClick={setLogin}> Login</button>
      <button onClick={setSignup}> Signup</button>
    </div>
    )
}

export default Home;