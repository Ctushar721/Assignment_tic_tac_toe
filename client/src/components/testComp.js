import React, {setState} from "react";

function Foo() {
    // let [user,setUser] = setState(null);
    // const signInUser = ()=>{}; 
    return (
        <div>
            <h1>Login</h1>
            {/* <input 
            placeholder="email" 
            onChange={(event)=>{setUser({...user, Name:event.target.value})}}
            type='email'
             />
             <input 
            placeholder="password" 
            onChange={(event)=>{setUser({...user, Name:event.target.value})}}
            type='password'
             />
              <button onClick={signInUser}>
             Sign In
             </button> */}
        </div>
    )
}

export default Foo;