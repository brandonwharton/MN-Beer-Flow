import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './LoginForm.css';
// Material-UI components
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <section>
      <form onSubmit={login} className="login-register-form">
        <Typography variant="h4" component="h4">
          Login
        </Typography>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
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
        </div>
        <div className="login-register-margin">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={login}
          >
            Log In
        </Button>
        </div>
      </form>


      {/* <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label> */}

      {/* <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label> */}

      {/* <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div> */}
    </section>
  );
}

export default LoginForm;
