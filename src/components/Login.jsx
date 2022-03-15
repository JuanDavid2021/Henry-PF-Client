import { useAuth0 } from "@auth0/auth0-react";


const Login =()=>{
const {LoginWithRedirect}=useAuth0();
return <button onClick={()=>LoginWithRedirect()}>Login</button>
}

export default Login;