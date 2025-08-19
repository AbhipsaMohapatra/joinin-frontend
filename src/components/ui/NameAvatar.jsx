import React from "react";

import Avatar from "@mui/material/Avatar";

const NameAvatar = ({ name }) => {
    let arr = ["#ec4899", "#a855f7", "#06b6d4", "#14b8a6"]
  function stringToColor() {
    let ind = Math.floor(Math.random() * arr.length);
    return arr[ind];
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(),
        color:"black"
      },
      children: `${name[0]?.toUpperCase() || ""}`,
    };
  }
  return <Avatar {...stringAvatar(`${name}`)} />;
};

export default NameAvatar;
