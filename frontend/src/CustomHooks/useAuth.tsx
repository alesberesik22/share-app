import jwtDecode from "jwt-decode";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearAuth, setAuth } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { client } from "../api/client";

interface IJWT {
  iss: string;
  nbf: number;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  azp: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
  jti: string;
}

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  name: string;
  image: string;
  id: string;
}
export function useAuth() {
  const navigate = useNavigate();
  const authDispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decoded: IJWT = jwtDecode(accessToken);
      authDispatch(
        setAuth({
          isAuthenticated: true,
          accessToken: accessToken,
          name: decoded.given_name + " " + decoded.family_name,
          id: decoded.sub,
          image: decoded.picture,
        })
      );
      navigate("/home");
    }
  }, []);
  const login = (accessToken: string) => {
    const decoded: IJWT = jwtDecode(accessToken);
    authDispatch(
      setAuth({
        isAuthenticated: true,
        accessToken: accessToken,
        name: decoded.given_name + " " + decoded.family_name,
        id: decoded.sub,
        image: decoded.picture,
      })
    );
    localStorage.setItem("accessToken", accessToken);
    const doc = {
      _id: decoded.sub,
      _type: "user",
      userName: decoded.given_name + " " + decoded.family_name,
      image: decoded.picture,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/home", { replace: true });
    });
  };
  const logout = () => {
    authDispatch(clearAuth());
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return { login, logout };
}
