import React from "react";
import Items from "./Items";

const MainContent = ({ items, handleCheck, handleDelete }) => {
  return (
    <main>
      {items.length ? (
        <Items
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      ) : (
        <p
          style={{
            color: "#FFF",
            fontSize: "1.85rem",
            forntWeight: "bold",
            marginTop: "2rem",
          }}
        >
          Your list is empty.
        </p>
      )}
    </main>
  );
};

export default MainContent;
