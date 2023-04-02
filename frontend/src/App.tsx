import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import UserProfile from "./components/UserProfile/UserProfile";
import Feed from "./components/Feed/Feed";
import PinDetail from "./components/PinDetail/PinDetail";
import Search from "./components/Search/Search";
import SideBar from "./components/SideBar/SideBar";
import PhoneSideBar from "./components/PhoneSideBar/PhoneSideBar";
import CreatePin from "./pages/CreatePin/CreatePin";

const Layout = () => {
  return (
    <div className="layout">
      <SideBar />
      <PhoneSideBar />
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/category/:categoryId",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/pin-detail/:pinID",
        element: (
          <ProtectedRoute>
            <PinDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "/create-pin",
        element: (
          <ProtectedRoute>
            <CreatePin />
          </ProtectedRoute>
        ),
      },
    ],
  },
  // { path: "/", element: <Login /> },
  // {
  //   path: "/home",
  //   element: (
  //     <ProtectedRoute>
  //       <Home />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/user-profile/:userID",
  //   element: (
  //     <ProtectedRoute>
  //       <UserProfile />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/category/:categoryID",
  //   element: (
  //     <ProtectedRoute>
  //       <Feed />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/pin-detail/:pinID",
  //   element: (
  //     <ProtectedRoute>
  //       <PinDetail />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/search",
  //   element: (
  //     <ProtectedRoute>
  //       <Search />
  //     </ProtectedRoute>
  //   ),
  // },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
