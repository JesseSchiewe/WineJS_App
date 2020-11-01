import React, { useState } from "react";
//import { Link } from "@reach/router";
import { Link } from "react-router-dom";
import {signInWithGoogle} from "../Firebase";
import { auth, generateUserDocument } from "../Firebase";
import { Redirect } from 'react-router-dom';



const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      generateUserDocument(user, {displayName});
      setToHome(true)
    }
    catch(error){
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };
  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  const [toHome, setToHome] = useState(false);
  return (
    <div>
      <h1>Sign Up</h1>
      <div className="SignUp">
        <form>
          <label htmlFor="displayName" className="signuplabel">
            Display Name:
          </label>
          <p/>
          <input
            type="name"
            className="signupfield"
            name="displayName"
            value={displayName}
            placeholder="E.g: BobTest"
            id="displayName"
            onChange={event => onChangeHandler(event)}
          />
          <p/>
          <label htmlFor="userEmail" className="signuplabel">
            Email:
          </label>
          <p/>
          <input
            type="email"
            className="signupfield"
            name="userEmail"
            value={email}
            placeholder="E.g: BobTest@gmail.com"
            id="userEmail"
            onChange={event => onChangeHandler(event)}
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
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={event => onChangeHandler(event)}
          />
          <p/>
          <button
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={event => {createUserWithEmailAndPasswordHandler(event, email, password);}}
          >
          Sign up
          </button>
          {error !== null && (
          <div className="error">
            {error}
          </div>
          )}
          {toHome ? <Redirect to={{ pathname:"/" }} /> : null}
          <h2>or</h2>
          <button
            className="bg-red-500 hover:bg-red-600 w-full py-2 text-white " onClick={signInWithGoogle}
          >
            Sign In with Google
          </button>
          <p className="text-center my-3">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:text-blue-600">
              Sign in here
            </Link>
          </p>
        </form>

      </div>
    </div>
  );
};
export default SignUp;