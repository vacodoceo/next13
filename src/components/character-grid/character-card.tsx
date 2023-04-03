"use client";
import Image from "next/image";
import { CharacterWithLevelRecords } from "@/app/api/update-characters/types/character";
import { useMemo } from "react";
import { CharacterLevelChart } from "./character-level-chart";
import { formatClassName } from "@/helpers/format-character-name";

export const CharacterCard = ({
  character,
}: {
  character: CharacterWithLevelRecords;
}) => {
  const { name, level, imageURL, levelerName } = character;
  const formattedClass = useMemo(
    () => formatClassName(character.class),
    [character.class]
  );

  return (
    <div className="overflow-hidden rounded-xl bg-[#272a30] transition-all hover:scale-105">
      <div className="relative h-28 sm:h-32">
        <Image
          src={imageURL}
          fill
          className="top-[20%] object-cover object-center"
          alt=""
          sizes="100%"
        />
        <div className="absolute bottom-0 h-1/2 w-full bg-transparent bg-gradient-to-b from-transparent to-[#272a30]" />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap justify-between gap-x-1 font-semibold text-white">
          <span className="sm:tracking-wide">{name}</span>
          <span>{level}</span>
        </div>
        <div className="flex justify-between gap-x-1 text-sm text-gray-400">
          <span>{levelerName}</span>
          <span className={`text-${formattedClass}`}>{character.class}</span>
        </div>
      </div>
      <div>
        <CharacterLevelChart character={character} />
      </div>
    </div>
  );
};
