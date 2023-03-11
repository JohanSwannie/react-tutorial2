import React from "react";

const Footer = ({ length }) => {
  const today = new Date();
  return (
    <footer>
      <p>
        {length} List {length === 1 ? "Item" : "Items"}
      </p>
      <h5>Copyright &copy; {today.getFullYear()}</h5>
    </footer>
  );
};

export default Footer;
