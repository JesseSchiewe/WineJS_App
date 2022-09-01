import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import { auth } from "../Firebase";
// //import { signInWithGoogle } from "../Firebase";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


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
    <form>
      <div className="SignInPage" >
        <Box
          // component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
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

            <Button variant="contained" type="submit" onClick={handleSubmit(onSubmit)} >Sign In</Button>

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
