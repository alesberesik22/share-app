import React, { useEffect, useState } from "react";
import "./Header.scss";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolled = currentScrollPos > 100;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`header ${scrolled && "scroll"}`}
      onClick={() => navigate("/home")}
    >
      <img src={logo} alt="logo" className="header_logo" />
      SHAREME
    </div>
  );
};

export default Header;
