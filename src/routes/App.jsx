// App.js
import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Game } from "../services/Game";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";

export default function App() {
  const [items, setItems] = useState([]);
  const game = Game();

  useEffect(() => {
    game.init();
    const cards = game.getDeck().map((card) => ({
      id: card.id,
      content: (
        <Cards
          category={card.type}
          title={card.name}
          description={card.description}
        />
      ),
    }));
    setItems(cards);
  }, []);

  function setItemsValue(value) {
    setItems(value);
  }

  return (
    <>
      <sub
        className="link"
        title="Matis Byar et Valentin Vanhove — Nuit de l’Info 2023. Nos sources : IEA : Agence Internationale de l'Énergie, EGDAR : Emissions Database for Global Atmospheric Research. Merci d’avoir joué !"
      >
        ?
      </sub>
      <Header city={game.getCity()} energy={game.getEnergy()} />
      <div id="zonednd" className="zonednd">
        Déposez vos cartes ici
        <br />
        Survolez les cartes pour plus de détail !
      </div>
      <div id="footer">
        {items.length !== 0 && (
          <Footer game={game} setItems={setItemsValue} items={items} />
        )}
      </div>
    </>
  );
}
