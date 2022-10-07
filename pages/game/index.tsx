import type { GetStaticProps, NextPage } from "next";
import { BaseSyntheticEvent, MouseEventHandler, useState } from "react";

type Props = {
  selectedDeck: [];
  enemyDeck: [];
};

const Game = ({ selectedDeck, enemyDeck }: Props) => {
  const [selectedCard, setSelectedCard] = useState("");
  function getCardHandler(event: BaseSyntheticEvent) {
    setSelectedCard(event.target.innerHTML);
  }
  return (
    <>
      <div className="flex flex-row">
        {selectedDeck.map((card) => (
          <p key={card} className="mx-3 uppercase" onClick={getCardHandler}>
            {card}
          </p>
        ))}
      </div>
      <div className="flex flex-row ">
        {enemyDeck.map((card) => (
          <p key={card} className="mx-3 uppercase">
            {card}
          </p>
        ))}
      </div>
      <div>{selectedCard}</div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const fiveCards = async () => {
    let deck = [];
    for (let i = 0; i < 5; i++) {
      const random = Math.floor(Math.random() * 100) + 1;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${random}`
      );
      const data = await response.json();
      deck.push(data.forms[0].name);
    }
    return deck;
  };

  const selectedDeck = await fiveCards();
  const enemyDeck = await fiveCards();
  return {
    props: {
      selectedDeck: selectedDeck,
      enemyDeck: enemyDeck,
    },
  };
};

export default Game;
