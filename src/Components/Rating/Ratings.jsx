import React from "react";
import { Rating, Typography } from "@material-tailwind/react";

export function Ratings({ rated, setRated }) {
  return (
    <div className="flex items-center gap-2">
      <Rating value={rated} onChange={(value) => setRated(value)} />
      <Typography color="blue-gray" className="font-medium">
        {rated}.0 Rated
      </Typography>
    </div>
  );
}

export default Ratings;
