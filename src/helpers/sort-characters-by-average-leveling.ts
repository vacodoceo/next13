import { CharacterWithLevelRecords } from "@/app/api/update-characters/types/character";

const getAverageLeveling = (character: CharacterWithLevelRecords): number => {
  const newestRecord = character.LevelRecords.slice(-1)[0];
  const threeDaysBeforeOrOldestRecord = character.LevelRecords.slice(
    -3 * 24
  )[0];

  console.log({ newestRecord, threeDaysBeforeOrOldestRecord });

  return (
    (newestRecord.level - threeDaysBeforeOrOldestRecord.level) /
    (Date.now() - new Date(threeDaysBeforeOrOldestRecord.timestamp).getTime())
  );
};

export const sortCharactersByAverageLeveling = (
  characters: CharacterWithLevelRecords[]
): CharacterWithLevelRecords[] => {
  return characters.sort(
    (a, b) => getAverageLeveling(b) - getAverageLeveling(a)
  );
};
