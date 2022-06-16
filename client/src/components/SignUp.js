import React, {useState} from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
function SignUp(props) {
    const cookies = new Cookies();
    let initialuser = {
        Name: false,
        Email: false,
        Password: false
    }
    let [user,setUser] = useState(initialuser); 
    const signUpUser = ()=>{
        Axios.post("http://localhost:3001/signup", user).then((res)=> {
            console.log("reaching here")
            const {token, userId, Name, Email, hashedPassword} = res.data;
            //working
            cookies.set("token",token);
            cookies.set("userId",userId);
            cookies.set("Name",Name);
            cookies.set("Email",Email);
            cookies.set("hashedPassword",hashedPassword);
            props.setIsAuth(true);
        })
        
    }; 

    return (
        <div className="signUp">
            <h1>Create Account</h1>
            <input 
            placeholder="Name" 
            onChange={(event)=>{setUser({...user, Name:event.target.value})}}
            type='text'
             />
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
             <button onClick={signUpUser} class="btn btn-dark">
             Sign up
             </button>
             
        </div>
    )
}

export default SignUp