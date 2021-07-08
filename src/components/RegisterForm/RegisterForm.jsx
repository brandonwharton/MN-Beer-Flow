import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Material-UI components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <section>
      <form className="login-register-form" onSubmit={registerUser}>
        <Typography variant="h4" component="h4">
          Register User
        </Typography>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div className="login-register-margin">
          <TextField
            className="text-field"
            variant="outlined"
            label="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          >
          </TextField>
        </div>
        <div>
          <TextField
            className="text-field"
            variant="outlined"
            label="password"
            value={password}
            inputProps={{ type: 'password' }}
            onChange={(event) => setPassword(event.target.value)}
          >
          </TextField>
          <div className="login-register-margin">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={registerUser}
          >
            Register
        </Button>
        </div>
        </div>


        {/* <label htmlFor="username">
            Username:
          <input
              type="text"
              name="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
            />
          </label> */}

        {/* <div>
          <label htmlFor="password">
            Password:
          <input
              type="password"
              name="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
        </div> */}
        {/* <div>
          <input className="btn" type="submit" name="submit" value="Register" />
        </div> */}
      </form>
    </section>
  );
}

export default RegisterForm;
