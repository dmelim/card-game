import { Cinzel } from "next/font/google";
import Image from "next/image";

type Element = "fire" | "water" | "earth" | "air" | "dark" | "light";

type Props = {
  id: string;
  image: string;
  attack: number;
  mana: number;
  description: string;
  name: string;
  element: Element;
  disabled?: boolean;
};

const elementBg: Record<Element, string> = {
  fire: "from-red-800 to-red-900",
  water: "from-blue-800 to-blue-900",
  earth: "from-green-700 to-green-900",
  air: "from-cyan-700 to-cyan-900",
  dark: "from-zinc-800 to-black",
  light: "from-yellow-100 to-yellow-300 text-black",
};
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
});

const elementGlow: Record<Element, string> = {
  fire: "drop-shadow-[0_1.5px_4px_rgba(255,100,100,0.95)]",
  water: "drop-shadow-[0_1.5px_4px_rgba(100,200,255,0.95)]",
  earth: "drop-shadow-[0_1.5px_4px_rgba(150,255,150,0.95)]",
  air: "drop-shadow-[0_1.5px_4px_rgba(180,240,255,0.95)]",
  dark: "drop-shadow-[0_1.5px_4px_rgba(180,180,255,0.8)]",
  light: "drop-shadow-[0_1.5px_4px_rgba(255,255,180,0.95)]",
};

const elementNameBg: Record<Element, string> = {
  fire: "bg-gradient-to-b from-red-300/40 to-yellow-300/40",
  water: "bg-gradient-to-b from-blue-300/40 to-cyan-200/40",
  earth: "bg-gradient-to-b from-green-300/40 to-lime-200/40",
  air: "bg-gradient-to-b from-cyan-400/40 to-sky-300/40",
  dark: "bg-gradient-to-b from-indigo-200/40 to-slate-500/40",
  light: "bg-gradient-to-b from-yellow-400/40 to-amber-400/40",
};

export function Card({
  id,
  image,
  attack,
  mana,
  description,
  name,
  element,
  disabled = false,
}: Props) {
  return (
    <div
      className={`select-none pointer-events-auto w-48 h-72 rounded-xl overflow-hidden border border-slate-700 shadow-md flex flex-col transition-transform duration-200 ${
        disabled
          ? "cursor-not-allowed"
          : "hover:cursor-pointer hover:-translate-y-1"
      } ${element === "light" ? "text-black" : "text-white"} bg-gradient-to-b ${
        elementBg[element]
      }`}
      id={id}
    >
      <div className="relative h-70 w-full">
        <Image
          src={image}
          alt={name}
          fill
          draggable={false}
          className="object-cover"
          sizes="192px"
        />

        <div
          className={`${cinzel.className} absolute top-1 left-1/2 -translate-x-1/2 w-[90%] text-center text-sm font-bold truncate text-black ${elementGlow[element]} backdrop-blur-sm ${elementNameBg[element]} rounded-sm text-stroke-white`}
        >
          {name}
        </div>

        <div className="absolute bottom-1 left-1 w-8 h-8 rounded-full bg-cyan-300 text-cyan-900 text-xs font-bold flex items-center justify-center border border-white shadow">
          {mana}
        </div>

        <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-rose-700 text-white text-xs font-bold flex items-center justify-center border border-white shadow">
          {attack}
        </div>
      </div>

      <div className="h-24 px-2 py-2 text-xs font-sans font-medium bg-black/30 text-center border-t border-white/20">
        <p className="line-clamp-4">{description}</p>
      </div>
    </div>
  );
}
