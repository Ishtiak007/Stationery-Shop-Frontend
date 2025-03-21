/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Img } from "react-image";
import React from "react";
import { Link } from "react-router-dom";

export const Card = React.memo(({ card }: { card: any }) => (
  <div className="rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out">
    <Img
      src={card.src}
      alt={card.title}
      className="object-cover w-full h-full transform transition-transform duration-300 hover:translate-y-[-5px]"
    />
    <div className="absolute bottom-0 w-full bg-black/50 py-4 px-4">
      <div className="text-base md:text-lg font-medium text-white">
        {card.title}
      </div>
    </div>
  </div>
));

Card.displayName = "Card";

type CardType = {
  title: string;
  src: string;
  id: string;
};

export function CustomerFavoritesCard({ cards }: { cards: CardType[] }) {
  return (
    <div className="grid font-orbitron grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Link key={index} to={`/product/${card.id}`}>
          <Card card={card} />
        </Link>
      ))}
    </div>
  );
}
