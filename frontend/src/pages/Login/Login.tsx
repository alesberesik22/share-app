import React from "react";
import "./Login.scss";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import sharemeVideo from "../../assets/share.mp4";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="login_video">
        <video src={sharemeVideo} loop muted autoPlay className="video" />
      </div>
      <div className="login_button">text</div>
    </div>
  );
};

export default Login;
