import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  const date: number = new Date().getFullYear();

  return (
    <footer>
      &copy;<span id="year">{date} </span>
      <span>Romanyk Yulia. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
