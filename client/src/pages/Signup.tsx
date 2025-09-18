import { Link } from "react-router-dom";
import AuthForm from "./components/AuthForm"

const Signup = () => {
  return (
    <>
    <AuthForm redirectTo="/" apiEndpoint="http://localhost:8080/api/auth/signup" title="Create Account" buttonText="Sign up"  />
    <p> 
      Already have an account?
      <Link to="/">Login here</Link>
    </p>
    </>
  )
}

export default Signup;