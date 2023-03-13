import React from "react";

const Footer = ({ length }) => {
  const today = new Date();
  return (
    <footer>
      <p>
        {length > 1
          ? `${length} List Items`
          : length === 1
          ? `${length} List Item`
          : null}
      </p>
      <h5>Copyright &copy; {today.getFullYear()}</h5>
    </footer>
  );
};

export default Footer;
