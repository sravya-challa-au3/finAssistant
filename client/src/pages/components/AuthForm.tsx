import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = ({title, buttonText, apiEndpoint, redirectTo} : {
  title: string,
  buttonText: string,
  apiEndpoint: string, 
  redirectTo: string
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios.post(apiEndpoint, { username, password })
    .then(res => {
      if(res.status === 200 || res.status === 201) {
        setError("");
        navigate(redirectTo);
        if(buttonText === "Login") {
          localStorage.setItem("isLoggedIn", "true")
        }
      }
    }) 
    .catch(err => {
      setError(err?.message || "Something went wrong")
    })

  }

  const handleUsernameChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const handlePswChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <h2> {title} </h2>
      <div>
        <label htmlFor="username">Username</label>
        <input type="email" id="username" value={username} name="username" placeholder="Enter username or email" required onChange={handleUsernameChange} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Password" value={password} required onChange={handlePswChange} />
      </div>
      <button type="submit" >{buttonText}</button>

      {error && <p style={{color:"red"}}> {error} </p>}

    </form>
  )
}

export default AuthForm