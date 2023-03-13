import React, { useState, useEffect } from "react";
import Headings from "./Headings";
import SearchItem from "./SearchItem";
import AddItem from "./AddItem";
import MainContent from "./MainContent";
import Footer from "./Footer";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3001/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw Error("Fetch Failed - expected data not received");
        }
        const fetchedItems = await response.json();
        setItems(fetchedItems);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  const addMoreItems = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const theNewItem = { id, checked: false, item };
    const listOfItems = [...items, theNewItem];
    setItems(listOfItems);

    const postOperation = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(theNewItem),
    };

    const result = await apiRequest(API_URL, postOperation);

    if (result) {
      setFetchError(result);
    }
  };

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const itemToBeUpdated = items.filter((item) => item.id === id);

    const updateOperation = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checked: !itemToBeUpdated[0].checked }),
    };

    const requestUrl = `${API_URL}/${id}`;

    const result = await apiRequest(requestUrl, updateOperation);

    if (result) {
      setFetchError(result);
    }
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOperation = {
      method: "DELETE",
    };

    const requestUrl = `${API_URL}/${id}`;

    const result = await apiRequest(requestUrl, deleteOperation);

    if (result) {
      setFetchError(result);
    }
  };

  const displayError = (errorMessage) => {
    const errMsg = document.getElementById("errorMsg");
    errMsg.innerText = errorMessage;
    errMsg.style.display = "block";
    setTimeout(() => {
      errMsg.style.display = "none";
    }, 2750);
  };

  const checkDuplicateItem = (newItem) => {
    const double =
      items.filter(
        (instance) => instance.item.toLowerCase() === newItem.toLowerCase()
      ).length > 0;
    return double;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!newItem) {
      return;
    }

    let errorMessage = "";
    let alphabetRegex = /[a-z]/gi;
    let result = alphabetRegex.test(newItem[0]);

    if (!result) {
      errorMessage = "Item Description must start with an alphabetic character";
      displayError(errorMessage);
      setNewItem("");
      return;
    } else if (newItem.length < 3) {
      errorMessage = "Item Description must be at least 3 characters in length";
      displayError(errorMessage);
      setNewItem("");
      return;
    }

    if (!checkDuplicateItem(newItem)) {
      addMoreItems(newItem);
    } else {
      errorMessage = "That Item Already Exists!";
      displayError(errorMessage);
    }

    setNewItem("");
  };

  return (
    <div className="App">
      <Headings title="Stella's Healthy Drinks List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && (
          <p style={{ color: "#FFF", fontWeight: "bold", fontSize: "1.4rem" }}>
            Items are loading.......
          </p>
        )}
        {fetchError && (
          <p
            style={{
              width: "100%",
              height: "5vh",
              textAlign: "center",
              lineHeight: "2",
              backgroundColor: "#FFF",
              color: "red",
            }}
          >{`Error: ${fetchError}`}</p>
        )}
        {!fetchError && !isLoading && (
          <MainContent
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <h3 id="errorMsg" aria-label="Error Message">
        Error Message
      </h3>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
