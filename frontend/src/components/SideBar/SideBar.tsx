import React from "react";
import "./SideBar.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../CustomHooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeNavbar } from "../../redux/navbarSlice";
import { RootState } from "../../redux/store";
import HomeIcon from "@mui/icons-material/Home";
import { categories } from "../../api/client";

const SideBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
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
    navbarDispatch(changeNavbar("user"));
    navigate(`/user-profile/${userData.id}`);
  };
  return (
    <div className="sideBar">
      <div className={`sideBar_menu`}>
        <div className="sideBar_menu_content">
          <div className="sideBar_menu_user" onClick={handleUserProfileClick}>
            <img
              src={userData.image}
              alt={userData.name}
              className="sideBar_menu_image"
            />
            <p className="sideBar_menu_user_name">{userData.name}</p>
          </div>
          <div className="sideBar_options">
            <div
              className={`sideBar_options_element ${
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
                <img src={category.image} alt={category.name} />
                {category.name}
              </div>
            ))}
          </div>
        </div>
        <div className="logout" onClick={auth.logout}>
          Log out
        </div>
      </div>
    </div>
  );
};

export default SideBar;
