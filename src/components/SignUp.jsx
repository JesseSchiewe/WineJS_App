import React, { useState } from "react";
import { Link } from "react-router-dom";
//import {signInWithGoogle} from "../Firebase";
// import { auth, generateUserDocument } from "../Firebase";
import { Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignUp = () => {
  const { register, handleSubmit, formState: { errors }} = useForm();

  // const onSubmit = (data, e) => console.log(data, e);
  const onError = (errors, e) => console.log(errors, e, "ERRORS PRESENT");

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [displayName, setDisplayName] = useState("");

  // const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
  // const createUserWithEmailAndPasswordHandler = async (props) => {

  const auth = getAuth();
  const onSubmit = async (props, event) => {
    // console.log(props);
    event.preventDefault();
    try{
      createUserWithEmailAndPassword(auth, props.email, props.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: props.displayName
        });
        // console.log(user);
        setToHome(true)
      })
      .catch((error) => {
        // console.alert('Failure trying to create user.');
        // const errorCode = error.code;
        // const errorMessage = error.message;
        alert(error.message);
        console.log(error.code, error.message);
      });
      // setToHome(true)
    }
    catch(error){
      console.warn('Error Signing up with email and password');
    }
  };


    // createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    //   });



  // const onSubmit = async (props, event) => {
  //   // console.log(props);
  //   event.preventDefault();
  //   try{
  //     const desiredDisplayName = props.displayName;
  //     const {user} = await auth.createUserWithEmailAndPassword(props.email, props.password);
  //     generateUserDocument(user, {desiredDisplayName});
  //     setToHome(true)
  //   }
  //   catch(error){
  //     console.warn('Error Signing up with email and password');
  //   }
  // };


  // const [error, setError] = useState(null);
  // const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
  //   event.preventDefault();
  //   try{
  //     const {user} = await auth.createUserWithEmailAndPassword(email, password);
  //     generateUserDocument(user, {displayName});
  //     setToHome(true)
  //   }
  //   catch(error){
  //     setError('Error Signing up with email and password');
  //   }

  //   // setEmail("");
  //   // setPassword("");
  //   // setDisplayName("");
  // };

  // const onChangeHandler = event => {
  //   const { name, value } = event.currentTarget;
  //   if (name === "userEmail") {
  //     setEmail(value);
  //   } else if (name === "userPassword") {
  //     setPassword(value);
  //   } else if (name === "displayName") {
  //     setDisplayName(value);
  //     console.log(displayName);
  //   }
  // };
  const [toHome, setToHome] = useState(false);
  
  return (
    <form>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '-webkit-fill-available' },
        }}
        noValidate
        autoComplete="off"
    >
      <h1>WineJS Sign Up</h1>
      <div className="SignUpPage">
          <TextField
            id="displayName"
            name="displayName"
            label="Display Name"
            placeholder="Ex: OnlyOnTheWeekends"
            // multiline
            fullWidth
            // reg={register}
            {...register("displayName", {
              required: "Required",
            })}
          />
          {errors.displayName && <span role="alert">{errors.displayName.message}</span>}

          <TextField
            name="userEmail"
            label="Email"
            placeholder="Email Address"
            // multiline
            fullWidth
            id="userEmail"
            // reg={register}
            {...register("email", {
              required: "required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Entered value does not match email format"
              }
            })}
          />
          {errors.email && <span role="alert">{errors.email.message}</span>}

          <TextField
            name="userPassword"
            label="Password"
            placeholder="Password"
            type="password"
            // multiline
            fullWidth
            id="userPassword"
            // reg={register}
            {...register("password", {
              required: "required",
              minLength: {
                value: 5,
                message: "min length is 5"
              }
            })}
          />
          {errors.password && <span role="alert">{errors.password.message}</span>}

          <div>
            <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit, onError)}>
              Sign up
            </Button>
          </div>
          {/* {error !== null && (
            <div className="error">
              {error}
            </div>
          )} */}
          {toHome ? <Navigate to={{ pathname:"/" }} /> : null}
          <div className="text-center my-3">
            Already have an account?{" "}
            <Link to="/SignIn" className="StandardLink">
              Sign in here
            </Link>
          </div>
        </div>
      </Box>
    </form>
  );
};
export default SignUp;