import React, {useState} from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
function Login(props) {
    const cookies = new Cookies();
    let [user,setUser] = useState(null);
    const signInUser = ()=>{
        Axios.post("http://localhost:3001/login", user).then((res)=> {
            console.log("reaching here Login")
            const {token, Name, Email, userId} = res.data;
            console.log("here", Email);
            cookies.set("token",token);
            cookies.set("userId",userId);
            cookies.set("Name",Name);
            cookies.set("Email",Email);
            props.setIsAuth(true);
        })

    }; 
    return (
        <div className="login">
            <h1>Login</h1>
            <input 
            placeholder="email" 
            onChange={(event)=>{setUser({...user, Email:event.target.value})}}
            type='email'
             />
             <input 
            placeholder="password" 
            onChange={(event)=>{setUser({...user, Password:event.target.value})}}
            type='password'
             />
              <button onClick={signInUser}>
             Sign In
             </button>
        </div>
    )
}

export default Login;