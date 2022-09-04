import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from '../providers/AuthContext';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { Typography } from "@mui/material";


export default function SignInUserNameandPassword({ login }) {
  const { register, handleSubmit, formState: { errors }} = useForm();
  // const [ SignedIn, setSignedIn ] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();

  const onSubmit = async (data) => {
    if (login) {
      await login(data.email, data.password);
      // setSignedIn(true);
    } else {
      // signInWithEmailAndPassword(auth, data.email, data.password)
      console.log(data);
      await signIn(data.email, data.password).catch((error) => {
          alert(error.message);
          console.log(error.code, error.message);
        });
    };
    // <Redirect to={{ pathname:"/home" }} />
  };


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
          <Stack direction="column" spacing={1}>
            <TextField
              id="email"
              label="email"
              name="email"
              placeholder="Email Address"
              type="email"
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
              autoComplete="current-password"
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
          </Stack>
          
          <Stack direction="column" spacing={2}>
            <Button variant="contained" type="submit">
              Sign In
            </Button>
            <div className="text">
              <div>
                <Link to="/signUp" className="StandardLink">Sign up here</Link>
              </div>
              <div>
                <Link to = "/passwordReset" className="StandardLink">Forgot Password?</Link>
              </div>
            </div>
            <Typography>
              - or -
            </Typography>
            <Button 
              variant="contained" 
              type="button"  
              startIcon={<GoogleIcon />} 
              onClick={signInWithGoogle}
              sx={{bgcolor: '#4285F4'}}
            >
              Sign in With Google
            </Button>
          </Stack>
        </Box>
      </div>
    </form>
  );
}
