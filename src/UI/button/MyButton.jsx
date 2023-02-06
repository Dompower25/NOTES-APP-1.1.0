import { Button } from "@mui/material";
import React from "react";
import sc from "./MyButton.module.scss";

const MyButton = ({ children, ...props }) => {
  return (
    <Button
      sx={{ margin: "0 5px", padding: "3px 0px 0px 0px", textAlign: "center", fontWeight: "500" }}
      variant="text"
      color="info"
      {...props}
      className={sc.button}
    >
      {children}
    </Button>
  );
};

export default MyButton;
