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

  const handleCancel = () => {
    setTitle("");
    setAbout("");
    setCategory("");
    setImageAsset(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const doc = {
      _type: "pin",
      title,
      about,
      url: destination,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset?._id,
        },
      },
      userID: user.id,
      postedBy: {
        _type: "postedBy",
        _ref: user.id,
      },
      category,
    };
    client.create(doc).then(() => {
      navigate("/home");
    });
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
                required
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
          <form onSubmit={handleSubmit}>
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
              <FormControl
                sx={{
                  width: "40%",
                  "&:hover": {
                    scale: "1.05",
                    "& .MuiFormLabel-root": {
                      color: "var(--thirdColor)",
                    },
                  },
                  "& .Mui-focused": {
                    color: "var(--thirdColor)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--thirdColor)",
                    },
                  },
                }}
              >
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category === undefined ? "" : category}
                  label="Categories"
                  onChange={handleChange}
                  required
                  sx={{
                    "&:focus": {
                      backgroundColor: "#ffddec",
                      borderColor: "brown",
                    },
                    "& .MuiOutlinedInput-root": {
                      border: "1px solid transparent",
                      transition: "all 250ms ease-in-out",
                      "&:focus-within": {
                        borderColor: "yellow",
                      },
                    },
                    "&	.MuiSelect-select": {
                      borderRadius: 10,
                    },
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--thirdColor)",
                        boxShadow: "var(--primary-shadow)",
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "var(--secondaryColor)",
                      transition: "all 250ms ease-in-out",
                      borderRadius: "10px",
                      boxShadow: "0",
                    },
                    "& 	.MuiSelect-select": {
                      outline: "none",
                    },
                    outline: "0",
                    border: "1px solid transparent",
                    transition: "all 250ms ease-in-out",

                    "& .MuiSelect-select": {
                      color: "black",
                      transition: "all 250ms ease-in-out",
                      "&:hover": {
                        color: "var(--secondaryColor)",
                      },
                    },
                    "& .MuiSelect-root.Mui-focused": {
                      borderColor: "green",
                    },
                  }}
                >
                  <MenuItem value={""}></MenuItem>
                  {categories.map((category) => (
                    <MenuItem
                      value={category.name}
                      sx={{
                        "&:hover": {
                          backgroundColor: "var(--mainColor)",
                          color: "white",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "var(--thirdColor)",
                        },
                      }}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="buttons">
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
