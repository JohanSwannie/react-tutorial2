import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Content = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: false,
      item: "Coffee",
    },
    {
      id: 2,
      checked: false,
      item: "Tea",
    },
    {
      id: 3,
      checked: false,
      item: "Orange Juice",
    },
    {
      id: 4,
      checked: false,
      item: "Milk",
    },
    {
      id: 5,
      checked: false,
      item: "Mango Juice",
    },
    {
      id: 6,
      checked: false,
      item: "Papaya Juice",
    },
    {
      id: 7,
      checked: false,
      item: "Coconut Water",
    },
    {
      id: 8,
      checked: false,
      item: "Apple Juice",
    },
    {
      id: 9,
      checked: false,
      item: "Grape Juice",
    },
    {
      id: 10,
      checked: false,
      item: "Guava Juice",
    },
  ]);

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
    localStorage.setItem("shoppinglist", JSON.stringify(listItems));
  };

  return (
    <main>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id}>
              <input
                type="checkbox"
                onChange={() => handleCheck(item.id)}
                checked={item.checked}
              />
              <label
                style={item.checked ? { textDecoration: "line-through" } : null}
                onDoubleClick={() => handleCheck(item.id)}
              >
                {item.item}
              </label>
              <FaTrashAlt
                onClick={() => handleDelete(item.id)}
                role="button"
                tabIndex="0"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
      )}
    </main>
  );
};

export default Content;
