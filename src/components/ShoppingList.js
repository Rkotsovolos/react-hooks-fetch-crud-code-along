import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

//Fetching data or in this case items!

  useEffect(() => {
    fetch('http://localhost:4000/items')
    .then(resp => resp.json())
    .then(setItems)
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  //This function updates STATE from our submit that we did on ItemForm
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  }

  const handleUpdateItem = (updatedItem) => {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} handleUpdateItem={handleUpdateItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
