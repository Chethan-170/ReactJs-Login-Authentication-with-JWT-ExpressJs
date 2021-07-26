import React, { useState } from 'react';
import useAuth from 'src/utils/auth';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const classes = useStyles();
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleSubmit = ()=>{
    (username) ? setUsernameErr(false) : setUsernameErr(true);
    (password) ? setPasswordErr(false) : setPasswordErr(true);
    if(username && password){
      login(username, password)
      .then((loggedIn) => {
        if (loggedIn) {
          navigate('/app/dashboard');        
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((err) => {
        alert(err);
      })
    }    
  }
  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">          
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      color="primary"
                      fullWidth
                      startIcon={<FacebookIcon />}
                      onClick={()=>{}}
                      size="large"
                      variant="contained"
                    >
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      fullWidth
                      startIcon={<GoogleIcon />}
                      onClick={()=>{}}
                      size="large"
                      variant="contained"
                    >
                      Login with Google
                    </Button>
                  </Grid>
                </Grid>
                <Box
                  mt={3}
                  mb={1}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                  error={usernameErr}
                  fullWidth
                  helperText= {(usernameErr)? 'User Name Required*' : ''}
                  label="User Name"
                  margin="normal"
                  name="username"
                  onChange={({ target: { value } }) => setUsername(value)}
                  type="text"
                  value={username}
                  variant="outlined"
                  disabled={false}
                />
                <TextField
                  error={passwordErr}
                  fullWidth
                  helperText= {(passwordErr)? 'Password Required*' : ''}
                  label="Password"
                  margin="normal"
                  name="password"
                  onChange={({ target: { value } }) => setPassword(value)}
                  type="password"
                  value={password}
                  variant="outlined"
                  disabled={false}
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={false}
                    fullWidth
                    size="large"
                    type="button"
                    variant="contained"
                    onClick={handleSubmit}
                  >
                    Sign In
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
