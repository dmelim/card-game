import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string;
  image: string;
  health: number;
  mana: number;
};

export function PlayerStats({ name, image, health, mana }: Props) {
  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-sm">
        <div className="text-red-400 font-bold">❤️ Health: {health}</div>
        <div className="text-blue-400 font-bold">💧 Mana: {mana}</div>
      </div>
    </div>
  );
}
