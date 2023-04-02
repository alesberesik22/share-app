import React from "react";
import "./Navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../assets/logo.png";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

interface Props {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<Props> = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="search-box">
        <input
          className="search-text"
          type="text"
          placeholder="Search Anything"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <a href="#" className="search-btn">
          <SearchIcon className="search_icon" />
        </a>
      </div>
      <div className="navbar_logo">
        <img src={logo} alt="logo" className="logo" />
        SHAREME
        <div
          className="navbar_create_pin"
          onClick={() => navigate("/create-pin")}
        >
          <AddIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
