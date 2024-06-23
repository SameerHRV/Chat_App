import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "./server/server";
import { isUserLoggedIn } from "./redux/redusers/auth";

const Home = React.lazy(() => import("./pages/Home"));
const Chat = React.lazy(() => import("./pages/Chat"));
const Groups = React.lazy(() => import("./pages/Groups"));
const Login = React.lazy(() => import("./pages/Login"));

// let user = true;

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   axios
  //     .get(`${server}/api/v1/users/profile`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       dispatch(isUserLoggedIn(res.data.user));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return loader ? (
    <div>Loading...</div>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoute user={user} />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/groups" element={<Groups />} />
        </Route>

        <Route
          path="/login"
          element={
            <ProtectRoute user={!user} redirect="/">
              <Login />
            </ProtectRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
