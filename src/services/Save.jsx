import React, { useState, useEffect } from "react";

/**
 * Save component manages saving, loading, and deleting game state.
 */
export default function Save() {
  // State variable to store the save data
  const [saveData, setSaveData] = useState({
    city: undefined,
    deck: [],
    factors: {},
    cards: [],
    history: [],
  });

  /**
   * Save data to localStorage.
   */
  const store = () => {
    localStorage.setItem("save", JSON.stringify(saveData));
  };

  /**
   * Load data from localStorage.
   */
  const load = () => {
    const savedData = localStorage.getItem("save");
    if (savedData) {
      console.log("A game save has been found.");
      setSaveData(JSON.parse(savedData));
    }
  };

  /**
   * Delete saved data from localStorage.
   */
  const deleteSave = () => {
    localStorage.removeItem("save");
  };

  // useEffect to load saved data when the component mounts
  useEffect(() => {
    load();
  }, []);
}
