import React, { useState } from "react";
import Headings from "./Headings";
import SearchItem from "./SearchItem";
import AddItem from "./AddItem";
import MainContent from "./MainContent";
import Footer from "./Footer";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppinglist"))
  );

  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  const saveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("shoppinglist", JSON.stringify(newItems));
  };

  const addMoreItems = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    saveItems(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    saveItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    saveItems(listItems);
  };

  const checkDuplicateItem = (newItem) => {
    const double =
      items.filter((instance) => instance.item === newItem).length > 0;
    return double;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newItem) {
      return;
    }
    if (!checkDuplicateItem(newItem)) {
      addMoreItems(newItem);
    } else {
      document.getElementById("errorMsg").innerText =
        "That Item Already Exists!";
      document.getElementById("errorMsg").style.display = "block";
      setTimeout(() => {
        document.getElementById("errorMsg").style.display = "none";
      }, 3500);
    }
    setNewItem("");
  };

  return (
    <div className="App">
      <Headings title="Stella's Healthy Drinks List" />
      <SearchItem search={search} setSearch={setSearch} />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <MainContent
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <h3 id="errorMsg" aria-label="Error Message">
        Error Message
      </h3>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
