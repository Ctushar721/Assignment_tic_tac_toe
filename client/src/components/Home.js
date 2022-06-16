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
    <h1>Tic Tac Toe </h1>
    <h1>MultiPlayer Game</h1>
    <br/>
      <button onClick={setLogin} class="btn btn-primary btn-lg LoginButtonHomePage btn-block"> Login</button>
      <br/>
      <button onClick={setSignup} class="btn btn-dark btn-lg SignUpButtonHomePage btn-block"> Register</button>
      
    </div>
    )
}

export default Home;