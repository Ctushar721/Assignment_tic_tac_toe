import React, {useState} from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
function Login(props) {
    const cookies = new Cookies();
    let [user,setUser] = useState(null);
    const signInUser = ()=>{
        Axios.post("https://tinfinity-deploy1.herokuapp.com/login", user).then((res)=> {
            console.log("reaching here Login")
            const {token, Name, Email, userId} = res.data;
            console.log("here", Email);
            cookies.set("token",token);
            cookies.set("userId",userId);
            cookies.set("Name",Name);
            cookies.set("Email",Email);
            if (token){
            props.setIsAuth(true);}
        })

    }; 
    return (
        <div className="login">
            <h1>Please Login</h1>
            <input 
            placeholder="Email" 
            onChange={(event)=>{setUser({...user, Email:event.target.value})}}
            type='email'
             />
             <input 
            placeholder="Password" 
            onChange={(event)=>{setUser({...user, Password:event.target.value})}}
            type='password'
             />
             <br/>
             <div>
              <button onClick={signInUser} class="btn btn-primary btn-lg SigninButton"> Sign in</button>
            </div>
        </div>
    )
}

export default Login;