import React, { useEffect, useState } from "react";
import {
  client,
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../../api/client";
import MasonryLayout from "../Layouts/MasonryLayout";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { IPins } from "../../interfaces/PinsInterface";
import "./UserProfile.scss";

export interface IUser {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
  image: string;
  userName: string;
}

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const [pins, setPins] = useState<IPins[]>([]);
  const [text, settext] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("Created");

  useEffect(() => {
    if (userId) {
      const query = userQuery(userId);

      client.fetch(query).then((data) => {
        setUser(data[0]);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (activeBtn === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId!);

      client.fetch(createdPinsQuery).then((data) => {
        console.log(data);
        setPins(data);
      });
    }
    if (activeBtn === "Saved") {
      const savedPinsQuery = userSavedPinsQuery(userId!);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  return (
    <div className="user_profile">
      <div className="user_profile_content">
        <div className="parent_image">
          <img
            src="https://source.unsplash.com/1600x900/?nature,photography,technology"
            alt="background"
            className="image_background"
          />
          <img src={user?.image} className="user_image" />
        </div>
        <h1>{user?.userName}</h1>
      </div>
      <div className="pins_content">
        <div className="pin_header">
          <button
            className={activeBtn === "Created" ? "active" : ""}
            onClick={() => {
              setActiveBtn("Created");
              settext("Created");
            }}
          >
            Created
          </button>
          <button
            className={activeBtn === "Saved" ? "active" : ""}
            onClick={() => {
              setActiveBtn("Saved");
              settext("Saved");
            }}
          >
            Saved
          </button>
        </div>
        {pins.length > 0 ? (
          <div className="pins">
            <MasonryLayout pins={pins} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserProfile;
