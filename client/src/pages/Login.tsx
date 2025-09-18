import { Link } from "react-router-dom";
import AuthForm from "./components/AuthForm"

const Login = () => {
  return (
    <>
    <AuthForm redirectTo="/home" apiEndpoint="http://localhost:8080/api/auth/login" title="Welcome Back" buttonText="Login"  />
    <p> 
      Don't have an account?
      <Link to="/signup">Sign up here</Link>
    </p>
    </>
  )
}

export default Login;