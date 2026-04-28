"use client";
import { useState } from "react";

type Props = { drinkId: string; className?: string };

export function DrinkArt({ drinkId, className }: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <svg
        viewBox="0 0 100 100"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M22 38 Q22 82 50 82 Q78 82 78 38 Z" />
        <path d="M78 48 Q92 48 92 60 Q92 74 78 74" />
        <path d="M22 38 Q30 30 38 38 Q46 30 54 38 Q62 30 70 38 Q74 34 78 38" />
        <circle cx="40" cy="56" r="1.6" fill="currentColor" stroke="none" />
        <circle cx="60" cy="56" r="1.6" fill="currentColor" stroke="none" />
        <path d="M42 64 Q50 70 58 64" />
        <path d="M50 18 Q47 24 50 30 Q53 24 50 18" opacity="0.5" />
      </svg>
    );
  }

  return (
    <img
      src={`/drinks/${drinkId}.png`}
      alt=""
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
