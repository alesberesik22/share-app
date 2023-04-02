import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Feed from "../../components/Feed/Feed";
import Navbar from "../../components/Navbar/Navbar";
import PinDetail from "../../components/PinDetail/PinDetail";
import "./Pins.scss";

const Pins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [section, setSection] = useState("feeds");
  return (
    <div className="pins">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="routes">
        <Feed />
      </div>
    </div>
  );
};

export default Pins;
