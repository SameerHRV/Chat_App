import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { LayoutLoader } from "./components/layout/Loders";
import { server } from "./constants/config";
import { userExists, userNotExists } from "./redux/reducers/auth";
=======
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "./server/server";
import { isUserLoggedIn } from "./redux/redusers/auth";
>>>>>>> 1716198c2e82467d05208970b2228d4949c6576f
>>>>>>> 3dc77cd73031c1de4f5a3b1ee4fe48512744cd03

const Home = React.lazy(() => import("./pages/Home"));
const Chat = React.lazy(() => import("./pages/Chat"));
const Groups = React.lazy(() => import("./pages/Groups"));
const Login = React.lazy(() => import("./pages/Login"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

let user = true;

const App = () => {
<<<<<<< HEAD
  return (
=======
<<<<<<< HEAD
  // console.log(server);
=======
>>>>>>> 1716198c2e82467d05208970b2228d4949c6576f
  const { user, loader } = useSelector((state) => state.auth);

  // const dispatch = useDispatch();

<<<<<<< HEAD
  useEffect(() => {
    axios
      .get(`${server}/api/v1/users/profile`, { withCredentials: true })
      .then((res) => dispatch(userExists(res.data.user)))
      .catch(() => dispatch(userNotExists()));
  }, [dispatch]);

  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
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
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagemant />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessageManagemant />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
=======
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
>>>>>>> 3dc77cd73031c1de4f5a3b1ee4fe48512744cd03
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

        <Route path="*" element={<NotFound />} />
      </Routes>
>>>>>>> 1716198c2e82467d05208970b2228d4949c6576f
    </BrowserRouter>
  );
};

export default App;
