import React, {useState} from "react";
//import ReactDOM from 'react-dom';
//import { Link } from "@reach/router";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../Firebase";
import { auth } from "../Firebase";
import { Redirect } from 'react-router-dom';

const [toHome, setToHome] = useState(false);

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
          setError("Error signing in with password and email!");
          console.error("Error signing in with password and email", error);
        });
        setToHome(true);
    };

      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;

          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

  return (
    <div className="mt-8">
      <h1>Sign In</h1>
      <div>
        <form className="">
          <label htmlFor="userEmail" className="signuplabel">
            Email:
          </label>
          <p/>
          <input
            type="email"
            className="signupfield"
            name="userEmail"
            value = {email}
            placeholder="E.g: BobTest@gmail.com"
            id="userEmail"
            onChange = {(event) => onChangeHandler(event)}
          />
          <p/>
          <label htmlFor="userPassword" className="signuplabel">
            Password:
          </label>
          <p/>
          <input
            type="password"
            className="signupfield"
            name="userPassword"
            value = {password}
            placeholder="Your Password"
            id="userPassword"
            onChange = {(event) => onChangeHandler(event)}
          />
          <p/>
          <button className="SignIn" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
            Sign in
          </button>
          <div className="error" >
            {error !== null && <div>{error}</div>}
          </div>
          {toHome ? <Redirect to={{ pathname:"/" }} /> : null}
          <h2>or</h2>
          <button className="GoogleSignIn" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
          <p className="text">
          Don't have an account?{" "}
          <Link to="signUp" className="text-blue-500 hover:text-blue-600">
            Sign up here
          </Link>{" "}
          <br />{" "}
          <Link to = "passwordReset" className="text-blue-500 hover:text-blue-600">
            Forgot Password?
          </Link>
          </p>
        </form>

      </div>
    </div>
  );

};


export default SignIn;