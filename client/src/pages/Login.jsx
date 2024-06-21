import { useFileHandler, useInputValidation } from "6pp";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { VisuallyHiddenInput } from "../components/styles/StyleedComponents";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { emailValidator, usernameValidator } from "../utils/validator";

const Login = () => {
  const dispatch = useDispatch();
  const [Login, setLogin] = useState(true);

  const avatar = useFileHandler("single");
  const name = useInputValidation("", usernameValidator);
  const username = useInputValidation("", usernameValidator);
  const bio = useInputValidation("");
  const email = useInputValidation("", emailValidator);
  const password = useInputValidation("");

  const handleLoggin = () => {
    setLogin((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/users/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(true));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("username", username.value);
    formData.append("bio", bio.value);
    formData.append("email", email.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(`${server}/api/v1/users/register`, formData, config);
      dispatch(userExists(true));
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <Container
      component={"main"}
      maxWidth="xs"
      sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
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
        {Login ? (
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
                label="Username OR Email"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                value={username.value}
                onChange={username.changeHandler}
              />
              <TextField
                label="Password"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button fullWidth sx={{ mt: 2 }} type="submit" variant="contained" color="primary">
                Login
              </Button>

              <Typography
                textAlign={"center"}
                m={"1rem"}
                sx={{
                  color: "gray",
                }}
              >
                OR
              </Typography>

              <Button fullWidth type="submit" variant="text" onClick={handleLoggin}>
                Register Account
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
              onSubmit={handleSignup}
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
                    <CameraAltIcon />
                    <VisuallyHiddenInput type="file" onChange={avatar.changeHandler} />
                  </>
                </IconButton>
              </Stack>

              {avatar.error && (
                <Typography margin={"1rem"} display={"block"} color="error" variant="caption" width={"fit-content"}>
                  {avatar.error}
                </Typography>
              )}

              <TextField
                label="name"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                type="text"
                value={name.value}
                onChange={name.changeHandler}
              />

              {name.error && (
                <Typography color="error" variant="caption">
                  {name.error}
                </Typography>
              )}

              <TextField
                label="Username"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                type="text"
                value={username.value}
                onChange={username.changeHandler}
              />

              {username.error && (
                <Typography color="error" variant="caption">
                  {username.error}
                </Typography>
              )}

              <TextField
                label="Bio"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                type="text"
                value={bio.value}
                onChange={bio.changeHandler}
              />
              <TextField
                label="Email"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                type="email"
                value={email.value}
                onChange={email.changeHandler}
              />

              {email.error && (
                <Typography color="error" variant="caption" sx={{ marginTop: "1rem" }}>
                  {email.error}
                </Typography>
              )}

              <TextField
                label="Password"
                required
                fullWidth
                margin="normal"
                variant="outlined"
                type="password"
                value={password.value}
                onChange={password.changeHandler}
              />
              <Button fullWidth sx={{ mt: 2 }} type="submit" variant="contained" color="primary">
                Register
              </Button>

              <Typography
                textAlign={"center"}
                m={"1rem"}
                sx={{
                  color: "gray",
                }}
              >
                OR
              </Typography>

              <Button fullWidth type="submit" variant="text" onClick={handleLoggin}>
                Login
              </Button>
            </form>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
