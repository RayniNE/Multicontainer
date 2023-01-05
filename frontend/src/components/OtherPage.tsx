import React, { FC } from "react";
import { Link } from "react-router-dom";

const OtherPageComponent: FC = () => {
  return (
    <div>
      Im some other page!
      <Link to="/"> Go Back Home</Link>
    </div>
  );
};

export default OtherPageComponent;
