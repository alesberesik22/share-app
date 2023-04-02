import React from "react";
import Masonry from "react-masonry-css";
import { IPins } from "../../interfaces/PinsInterface";
import Pin from "../Pin/Pin";
import "./MasonryLayout.scss";

interface Props {
  pins: IPins[];
}

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout: React.FC<Props> = ({ pins }) => {
  return (
    <Masonry className="masonryLayout" breakpointCols={breakpointObj}>
      {pins?.map((pin) => (
        <Pin pin={pin} key={pin._id} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
