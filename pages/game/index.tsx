import type { GetStaticProps, NextPage } from "next";
import { BaseSyntheticEvent, MouseEventHandler, useState } from "react";

type Props = {
  selectedDeck: [];
  enemyDeck: [];
};

const Game = ({ selectedDeck, enemyDeck }: Props) => {
  const [selectedCard, setSelectedCard] = useState("");
  const [enemyCard, setEnemyCard] = useState("");
  const [enemyDeckS, setEnemyDeckS] = useState(enemyDeck);
  const [gameStart, setGameStart] = useState(true);

  function getCardHandler(event: BaseSyntheticEvent) {
    setSelectedCard(event.target.innerHTML);
  }
  function selectEnemyCard() {
    const random = Math.floor(Math.random() * 5);
    setEnemyCard(enemyDeck[random]);
    //setEnemyDeckS(); =>  Estava a tentar remover a carta jogada do deck
    console.log(enemyDeckS);
  }
  function gameStartHandler() {
    selectEnemyCard();
    setGameStart(false);
  }
  function duelHandler() {
    /*  if (selectedCard.strength == enemyCard.type) {
      console.log("win");
    } */
    console.log(enemyCard, selectedCard);
    selectEnemyCard;
  }
  return (
    <>
      <div className="flex flex-row place-content-center">
        {" "}
        Your deck:
        {selectedDeck.map((card) => (
          <p key={card} className="mx-3 uppercase" onClick={getCardHandler}>
            {card}
          </p>
        ))}
      </div>
      <div className="flex flex-row place-content-center">
        {enemyDeck.map((card) => (
          <p key={card} className="mx-3 uppercase">
            {card}
          </p>
        ))}
      </div>
      <div className="flex place-content-center ">
        {gameStart ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={gameStartHandler}
          >
            Start
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={duelHandler}
          >
            Play
          </button>
        )}
      </div>
      <div className="text-center">Your Card: {selectedCard}</div>
      <div className="text-center">Enemy Card: {enemyCard}</div>
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
