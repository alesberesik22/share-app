import React from "react";
import "./Login.scss";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import GoogleIcon from "@mui/icons-material/Google";
import sharemeVideo from "../../assets/share.mp4";
import logo from "../../assets/logo2.png";
import { useAuth } from "../../CustomHooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Login = () => {
  const auth = useAuth();
  const authStore = useSelector((state: RootState) => state.auth);
  console.log(authStore.accessToken);
  return (
    <div className="login">
      <div className="login_video">
        <video src={sharemeVideo} loop muted autoPlay className="video" />
      </div>
      <div className="login_button">
        <div className="login_button_header">
          <img src={logo} alt="logo" className="logo" />
          <div className="wrapper">
            <div className="top">SHAREME</div>
            <div className="bottom" aria-hidden="true">
              SHAREME
            </div>
          </div>
        </div>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_TOKEN}>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              auth.login(credentialResponse.credential!);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default Login;
