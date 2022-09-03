import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';

import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { TextField } from "@mui/material";

const auth = getAuth();


const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = event => {
    event.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };

  return (
    <div className="Center">
      <h1 className="text">
        Reset your password
      </h1>
      <div>
        <form action="">
          {emailHasBeenSent && (
            <div className="text">
              An email has been sent to you!
            </div>
          )}
          {error !== null && (
            <div className="py-3 bg-red-600 w-full text-white text-center mb-3">
              {error}
            </div>
          )}

          <Stack direction="column" spacing={2}>
          <TextField
            id="userEmail"
            label="Email address"
            type="email"
            name="userEmail"
            // InputLabelProps={{
            //   shrink: true,
            // }}
            fullWidth
            placeholder="Email address"
            onChange={onChangeHandler}
          />
          <Button
            variant="contained"
            className="text"
            fullWidth
            onClick={event => {
              sendResetEmail(event);
            }}
          >
            Send me a reset link
          </Button>

          </Stack>
        </form>
        <div style={{marginTop: "2em"}}>
          <Link to = "/signIn" className="StandardLink">Sign in here</Link>
        </div>
        <div style={{marginTop: ".5em"}}>
          <Link to="/signUp" className="StandardLink">Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;