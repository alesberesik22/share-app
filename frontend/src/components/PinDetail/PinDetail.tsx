import React, { useEffect, useState } from "react";
import "./PinDetail.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { client, urlFor } from "../../api/client";
import MasonryLayout from "../Layouts/MasonryLayout";
import { pinDetailMorePinQuery, pinDetailQuery } from "../../api/client";
import { IPinDetail, IPins } from "../../interfaces/PinsInterface";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const PinDetail = () => {
  const { pinID } = useParams();
  const user = useSelector((state: RootState) => state.auth);
  const [pins, setPins] = useState<IPins[] | null>(null);
  const [pinDetails, setPinDetails] = useState<IPinDetail | null>(null);
  const [comment, setComment] = useState("");
  const [addComment, setAddComment] = useState(false);

  const fetchPinDetails = () => {
    if (pinID) {
      let query = pinDetailQuery(pinID);
      if (query) {
        client.fetch(query).then((data) => {
          setPinDetails(data[0]);
          if (data[0]) {
            query = pinDetailMorePinQuery(data[0]);
            client.fetch(query).then((res) => {
              setPins(res);
            });
          }
        });
      }
    }
  };

  const handleAddComment = () => {
    if (comment !== "") {
      setAddComment(true);

      client
        .patch(pinID!)
        .setIfMissing({ comments: [] })
        .insert("after", "comments[-1]", [
          {
            comment,
            _key: uuidv4(),
            postedBy: { _type: "postedBy", _ref: user.id },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetails();
          setComment("");
          setAddComment(false);
        });
    }
  };

  useEffect(() => {
    fetchPinDetails();
  }, [pinID]);

  console.log(pinDetails);

  if (!pinDetails) {
    return <div>Loading details</div>;
  }
  return (
    <div className="pin_details">
      <div className="pin_details_content">
        <img src={pinDetails.image.asset.url} alt={pinDetails.title} />
        <div className="pin_details_content_links">
          <a
            className="save_button"
            href={`${pinDetails.image.asset.url}?dl=`}
            download
          >
            <FileDownloadIcon />
          </a>
          <a href={pinDetails.url} target="_blank">
            {pinDetails.url}
          </a>
        </div>
        <div className="image_header">
          <h1>{pinDetails.title}</h1>
          <div className="image_header_user">
            <img src={pinDetails.postedBy.image} />
            <span>{pinDetails.postedBy.userName}</span>
          </div>
        </div>
        <h4>{pinDetails.about}</h4>
      </div>
      <div className="pin_details_comments">
        <h1>Comments</h1>
        <div className="comments">
          {pinDetails?.comments?.map((comment: any) => (
            <div className="comment_content">
              <div className="comment_content_user">
                <img src={comment.postedBy.image} alt="user-profile" />
                <p>{comment.postedBy.user}</p>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
          <div className="add_comment">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Comment"
            />
            <button type="button" onClick={handleAddComment}>
              Add Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinDetail;
