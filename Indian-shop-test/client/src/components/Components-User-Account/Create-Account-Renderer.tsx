import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControlLabel, InputBase, Checkbox, Typography, Container, Box, Button, Link, Grid, Avatar } from "@mui/material";
import { useStyles } from './form.styles';



const defaultTheme = createTheme();

const SignUp: React.FC = () => {
  const classes = useStyles();
  

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container style={{ paddingBottom: 100 }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2
          }}
        >
          <Avatar sx={{ m: 1, background: "#FF6600" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 4 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputBase
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  placeholder="First Name"
                  className={classes.inputElements}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputBase
                  required
                  fullWidth
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  className={classes.inputElements}
                />
              </Grid>
              <Grid item xs={12} spacing={4}>
                <InputBase
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                  className={classes.inputElements}
                />
              </Grid>
              <Grid item xs={12}>
                <InputBase
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  className={classes.inputElements}
                />
              </Grid>
              <Grid item xs={12} style={{ padding: 20 }}>
                <FormControlLabel
                  control={<Checkbox />}
                  label=""

                />
                <span className={classes.text}>By clicking on checkbox, you agree to our </span>
                <span className={classes.link}>Privacy Policy</span>
                <span className={classes.text}> and</span>
                <span className={classes.link}> Terms & Conditions.</span>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                  className={classes.submitButton}
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={12} justifyContent="flex-start">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  );
};

export default SignUp;
