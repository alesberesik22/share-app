import React, { useState } from "react";
import { IPins } from "../../interfaces/PinsInterface";
import "./Pin.scss";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import LinkIcon from "@mui/icons-material/Link";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { client } from "../../api/client";
import { PatchSelection } from "@sanity/client";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  pin: IPins;
}

const Pin: React.FC<Props> = ({ pin }) => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth);
  const [newId, setNewId] = useState("");
  const alreadySaved = !!pin?.save?.filter(
    (item) => item.postedBy._id === user.id
  ).length;

  const savePin = (id: PatchSelection) => {
    let myuuid = uuidv4();
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: myuuid,
            userId: user.id,
            postedBy: {
              _type: "postedBy",
              _ref: user.id,
            },
          },
        ])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };
  const handleDeletePin = (id: string) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="pin" onClick={() => navigate(`/pin-detail/${pin._id}`)}>
      <div className="layout">
        <div className="layout_top">
          <a
            className="save_button"
            href={`${pin.image.asset.url}?dl=`}
            download
            // target={"_blank"}
            onClick={(e) => e.stopPropagation()}
          >
            <FileDownloadIcon />
          </a>
          <div className="number_of_saves">
            {!alreadySaved ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  savePin(pin._id);
                }}
              >
                Save
              </button>
            ) : (
              pin?.save?.length + " Saved"
            )}
          </div>
        </div>
        <div className="bottom_layout">
          {pin.url && (
            <a
              className="layout_bottom"
              onClick={(e) => {
                e.stopPropagation();
              }}
              href={pin.url}
              target="_blank"
            >
              {pin.url}
            </a>
          )}
          {pin.postedBy._id === user.id && (
            <DeleteIcon
              className="delete_icon"
              onClick={(e) => {
                e.stopPropagation();
                handleDeletePin(pin._id);
              }}
            />
          )}
        </div>
      </div>
      <img className="pin_img" src={pin.image.asset.url} alt={pin._id} />
      <div
        className="pin_author"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`user-profile/${pin.postedBy._id}`);
        }}
      >
        <img
          src={pin.postedBy.image}
          alt={pin.postedBy.userName}
          className="pin_author_image"
        />
        <p className="pin_author_name">{pin.postedBy.userName}</p>
      </div>
    </div>
  );
};

export default Pin;
