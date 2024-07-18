import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControlLabel, InputBase, Checkbox, Typography, Container, Box, Button, Link, Grid, Avatar } from "@mui/material";
import { useStyles } from './form.styles';
// const navigate = useNavigate();

import { useAuth } from "../Authentication-Components/Auth";
import { useNavigate } from "react-router-dom";

const SignInRenderer = () => {
  const auth=useAuth();
  const navigate=useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if(auth?.login(data.get("email"),data.get("password"))){
      navigate("/")
    }
    else{ alert("not loggedin")}
  };

  const defaultTheme = createTheme();

  const classes = useStyles();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container style={{ paddingBottom: 100 }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, background: "#FF6600" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputBase
                  placeholder="Email Address"
                  className={classes.inputElements}
                  // margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} >
                <InputBase
                  required
                  fullWidth
                  placeholder="Password"
                  className={classes.inputElements}
                  // margin="normal"
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12} style={{ paddingLeft: 20, paddingBottom: 20 }}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="  Remember me"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  sx={{ mt: 3, mb: 2, }}
                  className={classes.submitButton}
                >
                  Login
                </Button>
              </Grid>
              <Grid container spacing={2} style={{ padding: 10 }}>
                <Grid item xs={12}>
                  <Link href="#" variant="body2" className={classes.link}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <span className={classes.text}>Don't have an account? </span>
                  <Link href="#" variant="body2" className={classes.link}>
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  );
}

export default SignInRenderer;
