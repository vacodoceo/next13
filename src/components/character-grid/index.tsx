"use client";

import { CharacterWithLevelRecords } from "@/app/api/update-characters/types/character";
import { SearchContext } from "@/context/search-provider";
import { useContext, useMemo } from "react";
import { CharacterCard } from "./character-card";

export const CharacterGrid = ({
  characters,
}: {
  characters: CharacterWithLevelRecords[];
}) => {
  const { searchValue } = useContext(SearchContext);
  const filteredCharacters = useMemo(() => {
    return characters.filter((character) => {
      const matchers = [
        character.name.toLowerCase(),
        character.class.toLowerCase(),
        character.levelerName.toLowerCase(),
      ];

      return matchers
        .map((matcher) => matcher.includes(searchValue))
        .some(Boolean);
    });
  }, [characters, searchValue]);

  return (
    <div className="grid grid-cols-2 gap-4 px-4 pb-8 md:grid-cols-3 md:gap-6">
      {filteredCharacters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
};
