import React, { useState } from "react";
import "./PhoneSIdeBar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import { changeNavbar } from "../../redux/navbarSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../CustomHooks/useAuth";

const categories = [
  { name: "Animals" },
  { name: "Wallpapers" },
  { name: "Photography" },
  { name: "Gaming" },
  { name: "Coding" },
  { name: "Others" },
];

const PhoneSideBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [displayMenu, setDisplayMenu] = useState(false);
  const userData = useSelector((state: RootState) => state.auth);
  const navbarData = useSelector((state: RootState) => state.nav);
  const navbarDispatch = useDispatch();

  const handleClick = (navElement: string) => {
    navbarDispatch(changeNavbar(navElement));
    navigate(`/${navElement}`);
  };
  const handleCategoryClick = (navElement: string) => {
    navbarDispatch(changeNavbar(navElement));
    navigate(`/category/${navElement}`);
  };
  const handleUserProfileClick = () => {
    console.log("som tu");
    navbarDispatch(changeNavbar("user"));
    navigate(`/user-profile/${userData.id}`);
  };
  return (
    <div className="phone_sideBar">
      <MenuIcon
        className="phone_sideBar_menu_icon"
        onClick={() => setDisplayMenu((prev) => !prev)}
      />
      {displayMenu && (
        <div className={`phone_sideBar_menu ${displayMenu ? "open" : "close"}`}>
          <div className="phone_sideBar_menu_content">
            <div className="phone_sideBar_menu_close">
              <CloseIcon
                className="close_icon"
                onClick={() => setDisplayMenu(false)}
              />
            </div>
            <div
              className="phone_sideBar_menu_user"
              onClick={handleUserProfileClick}
            >
              <img
                src={userData.image}
                alt={userData.image}
                className="phone_sideBar_menu_image"
              />
              <p className="phone_sideBar_menu_user_name">{userData.name}</p>
            </div>
            <div className="phone_sideBar_options">
              <div
                className={`phone_sideBar_options_element ${
                  navbarData.navbar === "home" && "active"
                }`}
                onClick={() => handleClick("home")}
              >
                <HomeIcon />
                <p>Home</p>
              </div>
              <h3 className="categories">Discover categories</h3>
              {categories.slice(0, categories.length - 1).map((category) => (
                <div
                  className={`category_element ${
                    navbarData.navbar === category.name && "active"
                  }`}
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
          <div className="logout" onClick={auth.logout}>
            Log out
          </div>
        </div>
      )}
    </div>
  );
};

export default PhoneSideBar;
