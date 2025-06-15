// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to our card game</h1>

      <div className="flex gap-4">
        <Button size="lg" onClick={() => router.push("/play")}>
          Play
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => router.push("/cards")}
        >
          Cards
        </Button>
      </div>
    </main>
  );
}
