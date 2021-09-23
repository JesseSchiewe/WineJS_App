// import React, {useState} from "react";
// //import ReactDOM from 'react-dom';
// //import { Link } from "@reach/router";
import { BrowserRouter, Link } from "react-router-dom";
// //import { signInWithGoogle } from "../Firebase";
import { auth } from "../Firebase";
// import { Redirect } from 'react-router-dom';


import React from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";

export default function SignIn({ login }) {
  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = async (data) => {
    await login(data.email, data.password);
    await auth.signInWithEmailAndPassword(data.email, data.password).catch(error => {
      console.log("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
    <Redirect to={{ pathname:"/home" }} />
  };

  return (
    <div className="SignInPage" >
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="signuplabel">email</label>
        <div>
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
            className="signupfield"
          />
        </div>
        {errors.email && <span role="alert">{errors.email.message}</span>}
        <label htmlFor="password" className="signuplabel">password</label>
        <div>          
          <input
            id="password"
            {...register("password", {
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5"
              }
            })}
            type="password"
            className="signupfield"
          />
        </div>
        {errors.password && <span role="alert">{errors.password.message}</span>}
        <div>
          <button type="SignIn" className="SignIn" >Sign In</button>
        </div>
      </form>
      <div className="text">
        <div>
          <Link to="/signUp" className="text-blue-500 hover:text-blue-600">Sign up here</Link>
        </div>
        <div>
          <Link to = "/passwordReset" className="text-blue-500 hover:text-blue-600">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
}
