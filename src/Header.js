import React from "react";

const Header = ({ description }) => {
  return (
    <header>
      <h1>{description} List</h1>
    </header>
  );
};

Header.defaultProps = {
  description: "No List Provided",
};

export default Header;
