import { useState } from "react";
import initial_data from "../data/initial-data.json";
import Save from "./Save";

/**
 * Game component represents the main logic for the game.
 */
export function Game() {
  // State variables using React hooks
  const [city, setCity] = useState(undefined);
  const [deck, setDeck] = useState([]);
  const [energy, setEnergy] = useState(undefined);
  const [factors, setFactors] = useState(initial_data.globals.factors);
  const [speed, setSpeed] = useState(1);
  const [cards, setCards] = useState([]);
  const [history, setHistory] = useState([]);

  /**
   * Update the city state with new fields.
   * @param {Object} fields - The fields to update in the city state.
   */
  const updateCity = (fields) => {
    setCity((prev) => {
      return { ...prev, ...fields };
    });
  };

  const getDeck = () => {
    return deck;
  };

  const getCity = () => {
    return city;
  };

  const getEnergy = () => {
    return energy;
  };

  /**
   * Initialize the game with default values and shuffle the cards.
   * @param {Object} selectedCity - The city chosen by the player.
   */
  const init = (selectedCity = initial_data.cities.jpn) => {
    for (let card of initial_data.cards) {
      for (let i = 0; i < card.count; i++) {
        cards.push(card);
      }
    }
    setCards((prevCards) => prevCards.sort(() => Math.random() - 0.5));

    setCity(selectedCity);
    setEnergy(initial_data.globals.energy);
    deal();
  };

  /**
   * Play one turn of the game.
   * @param {Object} cardId - The card to be played in the turn.
   */
  const cycle = (cardId = undefined) => {
    playCard(cardId);
    deal();
    save();

    if (hasWon()) {
      // TODO: End game
    }
  };

  /**
   * Apply the factors to the final game variables.
   */
  const applyFactors = () => {
    setCity((prevCity) => ({
      ...prevCity,
      health: prevCity.health * factors.health,
      power: prevCity.power * factors.power,
      ghg: prevCity.ghg * factors.ghg,
      people: prevCity.people * factors.people,
    }));
    setEnergy((prevEnergy) => prevEnergy * factors.energy);
  };

  /**
   * Update the game factors based on the impact of the played card.
   * @param {Object} card - The card played in the turn.
   */
  const updateFactors = (card) => {
    if (card === undefined || card === null) return;
    setFactors((prevFactors) => ({
      ...prevFactors,
      people: prevFactors.people + card.impacts.people,
      health: prevFactors.health + card.impacts.health,
      ghg: prevFactors.ghg + card.impacts.ghg,
    }));
    setEnergy((prevEnergy) => prevEnergy + card.impacts.energy);
  };

  /**
   * Check if the player has won the game.
   * @returns {boolean} - True if the player has won, otherwise false.
   */
  const hasWon = () => {
    return (
      city.people >= city.targetedPeople ||
      city.targetGhg * initial_data.globals.target.ghg <= city.ghg ||
      initial_data.globals.target.health <= city.health
    );
  };

  /**
   * Deal a new set of cards from the game's deck.
   */
  const deal = () => {
    let currentDeckSize = deck.length;
    for (let i = 0; i < 4 - currentDeckSize; i++) {
      deck.push(cards.pop());
    }
  };

  /**
   * Play a card in the game.
   * @param {string} id - The id of the card to be played.
   */
  const playCard = (id) => {
    let card = deck.find((card) => card.id === id);
    updateFactors(card);
    applyFactors();
    setHistory((prevHistory) => [...prevHistory, card]);
    setDeck((prevDeck) => prevDeck.filter((c) => c.id !== id));
  };

  /**
   * Save the game state.
   */
  const save = () => {
    Save.store();
  };

  return {
    init,
    cycle,
    playCard,
    getCity,
    getEnergy,
    getDeck,
    deck,
  };
}
