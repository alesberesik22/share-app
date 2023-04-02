import React, { useState } from "react";
import "./CreatePin.scss";
import { categories, client } from "../../api/client";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SanityImageAssetDocument } from "@sanity/client";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";

const CreatePin = () => {
  const user = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>(
    null
  );
  const [wrongImageType, setWrongImageType] = useState(false);

  const uploadImage = (e: React.MouseEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      const { type, name } = file;
      if (
        type === "image/png" ||
        type === "image/svg" ||
        type === "image/jpeg" ||
        type === "image/gif"
      ) {
        setWrongImageType(false);
        setLoading(true);
        client.assets
          .upload("image", e.currentTarget.files![0], {
            contentType: type,
            filename: name,
          })
          .then((document) => {
            setImageAsset(document);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setWrongImageType(true);
      }
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <div className="create_pin">
      {fields && <p>Please fill in all the fields</p>}
      <div className="create_pin_container">
        <div className="create_pin_container_image_upload">
          {imageAsset === null ? (
            <>
              <label className="click_to_upload" htmlFor="share_img">
                <CloudUploadIcon className="share_icon" />
                <p>Use high-quality JPG,SVG,PNG, GIF less than 20MB</p>
              </label>
              <input
                type="file"
                id="share_img"
                name="share_img"
                hidden
                onClick={uploadImage}
              />
            </>
          ) : (
            <div className="image_container">
              <img
                src={imageAsset.url}
                alt="uploaded_pic"
                className="uploaded_image"
              />
              <DeleteForeverIcon
                className="delete_image"
                onClick={() => setImageAsset(null)}
              />
            </div>
          )}
        </div>
        <div className="create_pin_container_image_description">
          <form>
            <input
              type="text"
              value={title}
              placeholder="Add your title here"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="user_info">
              <img src={user.image} alt={user.name} />
              <p>{user.name}</p>
            </div>
            <input
              type="text"
              value={about}
              placeholder="Add your description here"
              required
              onChange={(e) => setAbout(e.target.value)}
            />
            <input
              type="text"
              value={destination}
              placeholder="Add your url redirect"
              required
              onChange={(e) => setDestination(e.target.value)}
            />
            <div className="create_pin_category">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Categories"
                  onChange={handleChange}
                >
                  <MenuItem value={undefined}></MenuItem>
                  {categories.map((category) => (
                    <MenuItem value={category.name}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
