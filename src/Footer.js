import React from "react";

const Footer = () => {
  const today = new Date();
  return (
    <footer>
      <h5>Copyright &copy; {today.getFullYear()}</h5>
    </footer>
  );
};

export default Footer;
