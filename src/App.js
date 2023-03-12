import Header from "./Header";
import SearchItem from "./SearchItem";
import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppinglist"))
  );

  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem("shoppinglist", JSON.stringify(newItems));
  };

  const addItem = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
  };

  const handleCheck = (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setAndSaveItems(listItems);
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems);
  };

  const checkDuplicateItem = (newItem) => {
    const double = items.filter((item) => item.item === newItem).length > 0;
    return double;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newItem) {
      return;
    }
    if (!checkDuplicateItem(newItem)) {
      addItem(newItem);
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
      <Header title="Stella's Healthy Drinks List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
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
