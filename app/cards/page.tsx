// app/cards/page.tsx

import { Card } from "../components/Card";

import { cardSet } from "../card-set";
import { CardType } from "../types/card-types";

export default function CardsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-start p-6 gap-6">
      <h1 className="text-2xl font-semibold">Your Cards</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cardSet.map((card: CardType) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </main>
  );
}
