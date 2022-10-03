import type { GetStaticProps, NextPage } from "next";

type Props = {
  selectedDeck: "";
  enemyDeck: "";
};

const Game = ({ selectedDeck, enemyDeck }: Props) => {
  return (
    <div>
      <h1>{selectedDeck.toString()}</h1>
      <h1>{enemyDeck.toString()}</h1>
    </div>
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
