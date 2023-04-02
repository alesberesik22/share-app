import React, { useEffect, useState } from "react";
import "./Feed.scss";
import { client, feedQuery, searchQuery } from "../../api/client";
import MasonryLayout from "../Layouts/MasonryLayout";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { IPins } from "../../interfaces/PinsInterface";

const Feed = () => {
  const { categoryId } = useParams();
  const [pins, setPins] = useState<IPins[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  console.log(pins);

  if (loading) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
        We are adding feeds to your Feed list
      </div>
    );
  }

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
