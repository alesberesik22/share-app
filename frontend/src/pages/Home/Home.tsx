import React from "react";
import { client } from "../../api/client";
import "./Home.scss";
import Logo from "../../assets/logo2.png";
import SideBar from "../../components/SideBar/SideBar";
import PhoneSideBar from "../../components/PhoneSideBar/PhoneSideBar";
import Header from "../../components/Header/Header";
import Pins from "../Pins/Pins";

const Home = () => {
  return (
    <div className="home">
      <Pins />
    </div>
  );
};

export default Home;
