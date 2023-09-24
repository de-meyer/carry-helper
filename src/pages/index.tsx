import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import { api } from "~/utils/api";

export default function Home() {
  const [pokemonName, setPokemonName] = useState("");
  const { data: pokemon } = api.pokemon.fetchByName.useQuery({
    name: pokemonName,
  });

  return (
    <>
      <Head>
        <title>Carry Helper</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#7D6B3E] via-[#3E3A31] to-[#181818]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col gap-3 text-center">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Carry Helper
            </h1>
            <p className="text-white">
              Check how good your Pokémon is as a carry
            </p>
            <div className="relative h-40">
              <Image
                src="/logo.png"
                alt="logo"
                fill
                className="pointer-events-none bg-black mix-blend-screen"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
          <DebouncedInput
            placeholder="Enter Pokémon name"
            value={pokemonName}
            onChange={(v) => setPokemonName(v)}
          />
          {pokemon && (
            <div className="rounded border border-white p-3 text-white">
              <p className="text-2xl capitalize">{pokemon.name}</p>
              <ul>
                {Object.entries(pokemon.stats).map(([stat, value]) => (
                  <li
                    key={stat}
                    className={`grid grid-cols-2 gap-x-2 capitalize [&:nth-child(2)]:mb-3 [&:nth-child(2)]:border-b [&:nth-child(2)]:pb-3 ${
                      {
                        S: "text-green-500",
                        A: "text-green-300",
                        B: "text-yellow-400",
                        C: "text-yellow-600",
                        D: "text-red-300",
                        F: "text-red-500",
                      }[statValueToTier(value)]
                    }`}
                    style={{ gridTemplateColumns: "1fr 3ch" }}
                  >
                    <div className="text-right">{stat}:</div>
                    <div>{value}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

const DebouncedInput: React.FC<
  {
    value: string;
    onChange: (value: string) => void;
    debounce?: number;
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">
> = ({ value: initialValue, onChange, debounce = 300, ...props }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={
        "w-80 rounded border px-2 py-1 text-center text-3xl leading-tight focus:outline-none"
      }
    />
  );
};

const statValueToTier = (value: number) => {
  if (value >= 150) return "S";
  if (value >= 120) return "A";
  if (value >= 100) return "B";
  if (value >= 80) return "C";
  if (value >= 60) return "D";
  return "F";
};
