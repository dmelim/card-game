import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  name: string;
  image: string;
  health: number;
  mana: number;
  canAttack: boolean;
  isSelected: boolean;
  onClick?: () => void;
};

export function PlayerStats({
  name,
  image,
  health,
  mana,
  canAttack,
  isSelected,
  onClick,
}: Props) {
  const avatarClasses = (() => {
    if (canAttack && isSelected) return "border-red-500";
    if (canAttack) return "border-red-500 animate-pulse";
    return "border-transparent";
  })();
  return (
    <div className="flex items-center gap-4">
      <Avatar className={`border-2 ${avatarClasses}`} onClick={onClick}>
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
