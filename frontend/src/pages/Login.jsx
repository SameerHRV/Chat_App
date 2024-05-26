import React, { useState } from "react";
import { Container, Paper, TextField, Typography, Button, Stack, Avatar, IconButton } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/style/styleComponents";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/validator";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoggin = (e) => {
    e.preventDefault();
    setIsLogin((prev) => !prev);
  };

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");

  const avatar = useFileHandler("single");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.value && password.value) {
      setIsLogin(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (name.value && username.value && password.value && bio.value) {
      setIsLogin(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(rgba(200,200,20,0.5),rgba(120,110,220,0.5))",
      }}
    >
      <Container
        component={"main"}
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isLogin ? (
            <>
              <Typography variant="h5">Login</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleLogin}
              >
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button fullWidth sx={{ mt: 2 }} type="submit" variant="contained" color="primary">
                  Login
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  Or
                </Typography>

                <Button fullWidth type="submit" variant="text" onClick={handleLoggin}>
                  Register
                </Button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h5">Register</Typography>
              <form
                style={{
                  width: "100%",
                  marginTop: "1rem",
                }}
                onSubmit={handleRegister}
              >
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "cover",
                    }}
                    src={avatar.preview}
                  />

                  {avatar.error && (
                    <Typography margin={"1rem"} display={"block"} color="error" variant="caption">
                      {avatar.error}
                    </Typography>
                  )}

                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: "0rem",
                      right: "0rem",
                      color: "white",
                      bgcolor: "rgba(0,0,0,0.5)",
                      ":hover": {
                        bgcolor: "rgba(0,0,0,0.8)",
                      },
                    }}
                    component={"label"}
                  >
                    <>
                      <CameraAlt />
                      <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                    </>
                  </IconButton>
                </Stack>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />

                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />

                {username.error && (
                  <Typography color="error" variant="caption">
                    {username.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button fullWidth sx={{ mt: 2 }} type="submit" variant="contained" color="primary">
                  Register
                </Button>
                <Typography textAlign={"center"} m={"1rem"}>
                  Or
                </Typography>

                <Button fullWidth type="submit" variant="text" onClick={handleLoggin}>
                  Login
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
