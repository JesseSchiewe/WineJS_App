// import React, {useState} from "react";
// //import ReactDOM from 'react-dom';
// //import { Link } from "@reach/router";
import { Link } from "react-router-dom";
// //import { signInWithGoogle } from "../Firebase";
import { auth } from "../Firebase";
// import { Redirect } from 'react-router-dom';


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";

export default function SignIn({ login }) {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [ SignedIn, setSignedIn ] = useState(false);

  const onSubmit = async (data) => {
    if (login) {
      await login(data.email, data.password);
      setSignedIn(true);
    } else {
      await auth.signInWithEmailAndPassword(data.email, data.password).catch(error => {
        console.log("Error signing in with password and email!");
        console.error("Error signing in with password and email", error);
      });
    };
    // <Redirect to={{ pathname:"/home" }} />
  };

  return (
    <div className="SignInPage" >
      <h1>
        Sign In
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="signuplabel">Email:</label>
        <div style={{marginBottom:'30px'}}>
          <input
            id="email"
            {...register("email", {
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format"
              }
            })}
            type="email"
            className="signinfield"
          />
        </div>
        {errors.email && <span role="alert">{errors.email.message}</span>}
        <label htmlFor="password" className="signuplabel">Password:</label>
        <div style={{marginBottom:'30px'}} >          
          <input
            id="password"
            data-testid="password"
            {...register("password", {
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5"
              }
            })}
            type="password"
            className="signinfield"
          />
        </div>
        {errors.password && <span role="alert">{errors.password.message}</span>}
        <div>
          <button type="SignIn" className="SignIn" >Sign In</button>
        </div>
      </form>
      <div className="text">
        <div>
          <Link to="/signUp" className="StandardLink">Sign up here</Link>
        </div>
        <div>
          <Link to = "/passwordReset" className="StandardLink">Forgot Password?</Link>
        </div>
      </div>
      { SignedIn ? <Navigate to={{ pathname:"/home" }} /> : ""}
    </div>
  );
}
