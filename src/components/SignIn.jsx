import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
// import { auth } from "../Firebase";
import { useAuth } from '../providers/AuthContext';
// //import { signInWithGoogle } from "../Firebase";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


export default function SignInUserNameandPassword({ login }) {
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [ SignedIn, setSignedIn ] = useState(false);

  const { currentUser, signIn } = useAuth();

  // const auth = getAuth();
  // console.log(auth);

  // signInWithEmailAndPassword (auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  // });

  // const onSubmit = async (data) => {
  //   await signIn(data.email, data.password)
  //     .catch((error) => {
  //       console.log(error.code, error.message);
  //     });
  // };


  const onSubmit = async (data) => {
    if (login) {
      await login(data.email, data.password);
      setSignedIn(true);
    } else {
      // signInWithEmailAndPassword(auth, data.email, data.password)
      console.log(data);
      await signIn(data.email, data.password).catch((error) => {
          alert(error.message);
          // const errorCode = error.code;
          // const errorMessage = error.message;
          console.log(error.code, error.message);
        });
    };
    // <Redirect to={{ pathname:"/home" }} />
  };

  // const onSubmit = async (data) => {
  //   if (login) {
  //     await login(data.email, data.password);
  //     setSignedIn(true);
  //   } else {
  //     await signInWithEmailAndPassword(auth, data.email, data.password)
  //     console.log(data);
  //     // await signIn(data.email, data.password).catch((error) => {
  //         // const errorCode = error.code;
  //         // const errorMessage = error.message;
  //         // console.log(error.code, error.message);
  //       // });
  //   };
  //   // <Redirect to={{ pathname:"/home" }} />
  // };

  // const onSubmit = async (data) => {
  //   console.log("Attempting to log in");
  //   signInWithEmailAndPassword(auth, data.email, data.password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     console.log("Logging In");
  //     console.log(userCredential);
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //   });
  // };

  // async function onSubmit(email, password) {
  //   await signIn(email, password)
  //   .catch(err => console.log(JSON.stringify(err)) )
  // }






  // const onSubmit = async (data) => {
  //   if (login) {
  //     await login(data.email, data.password);
  //     setSignedIn(true);
  //   } else {
  //     await auth.signInWithEmailAndPassword(data.email, data.password).catch(error => {
  //       console.log("Error signing in with password and email!");
  //       console.error("Error signing in with password and email", error);
  //     });
  //   };
  //   // <Redirect to={{ pathname:"/home" }} />
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="SignInPage" >
        <Box
          // component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '-webkit-fill-available' },
          }}
          noValidate
          autoComplete="off"
        >
          <h1>
            WineJS Sign In
          </h1>
            <TextField
              id="email"
              label="email"
              name="email"
              placeholder="Email Address"
              // multiline
              fullWidth
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
              id="password"
              label="password"
              name="password"
              placeholder="password"
              type="password"
              fullWidth
              {...register("password", {
                required: "required",
                minLength: {
                  value: 5,
                  message: "min length is 5"
                }
              })}
            />
            {errors.password && <span role="alert">{errors.password.message}</span>}

            <Button variant="contained" type="submit">Sign In</Button>
            {/* <Button variant="contained" type="submit" onClick={() => handleSubmit(onSubmit)} >Sign In</Button> */}
            {/* <Button variant="contained" type="submit" onClick={ handleSubmit(onSubmit) } >Sign In</Button> */}
            {/* <Button variant="contained" type="submit" onClick={() => handleSubmit(onSubmit)} >Sign In</Button> */}


            {/* <Button variant="contained" type="submit" onClick={(data) => onSubmit(data.email, data.password)} >Sign In</Button> */}

          {/* </form> */}
          <div className="text">
            <div>
              <Link to="/signUp" className="StandardLink">Sign up here</Link>
            </div>
            <div>
              <Link to = "/passwordReset" className="StandardLink">Forgot Password?</Link>
            </div>
          </div>
          { SignedIn ? <Navigate to={{ pathname:"/home" }} /> : ""}
        </Box>
      </div>
    </form>
  );
}
