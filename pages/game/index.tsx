import type { GetStaticProps } from "next";
import { BaseSyntheticEvent, useState } from "react";

type Props = {
  selectedDeck: [];
  enemyDeck: [];
};

const Game = ({ selectedDeck, enemyDeck }: Props) => {
  let cardNum: number = 4;
  const [selectedCard, setSelectedCard] = useState("");
  const [enemyCard, setEnemyCard] = useState("");
  // This use state is different because typescript would assume this was a "never[]", so I definied the generic use state gives.
  const [enemyDeckS, setEnemyDeckS] = useState<string[]>(enemyDeck);
  const [gameStart, setGameStart] = useState(true);
  const [cardNumber, setCardNumber] = useState(cardNum);

  // The same logic that removes enemy cards of the deck needs to be applied to the player deck
  function getCardHandler(event: BaseSyntheticEvent) {
    setSelectedCard(event.target.innerHTML);
  }

  function selectEnemyCard() {
    // if clauses to guareente some conditions are met.
    if (
      selectedCard === "" ||
      selectedCard === null ||
      selectedCard === undefined
    ) {
      console.log("select a card to play!");
      return;
    }
    const random = Math.floor(Math.random() * cardNumber);
    const chosenEnemyCard = enemyDeckS[random];
    setEnemyCard(chosenEnemyCard);
    setEnemyDeckS((current) =>
      current.filter((card) => card != chosenEnemyCard)
    );
    if (cardNumber !== 0) {
      setCardNumber((current) => current - 1);
    }
    if (enemyDeckS.length === 0) {
      setGameStart(true);
    }
  }
  function gameStartHandler() {
    selectEnemyCard();
    setGameStart(false);
  }
  function duelHandler() {
    /*  if (selectedCard.strength == enemyCard.type) {
      console.log("win");
    } */
    console.log(enemyCard + " vs " + selectedCard);
    selectEnemyCard();
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
        {enemyDeckS.map((card) => (
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
