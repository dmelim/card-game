// components/Card.tsx
import { Card as UiCard, CardContent } from "@/components/ui/card";
import Image from "next/image";

type Props = {
  image: string;
  attack: number;
  mana: number;
  description: string;
};

export function Card({ image, attack, mana, description }: Props) {
  return (
    <UiCard className="w-48 h-72 relative flex flex-col overflow-hidden shadow-lg">
      <div className="w-full h-32 relative">
        <Image
          src={image}
          alt="Card illustration"
          fill
          className="object-cover"
        />
        <div className="absolute top-1 right-1 bg-white/80 text-black text-xs px-2 py-1 rounded-full font-bold">
          {mana}
        </div>
      </div>

      <div className="absolute top-28 left-2 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-bold border-2 border-white shadow">
        {attack}
      </div>

      <CardContent className="mt-auto bg-muted text-xs p-2">
        <p className="line-clamp-3">{description}</p>
      </CardContent>
    </UiCard>
  );
}
