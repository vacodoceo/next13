import { getBlizzardCharacter } from "./get-blizzard-character";
import { getSheetCharacters } from "./get-sheet-characters";
import { getToken } from "./get-token";
import { storeCharactersLevel } from "./store-characters-level";

export async function POST(request: Request) {
  const token = await getToken();
  const sheetCharacters = await getSheetCharacters();

  const blizzardCharacters = await Promise.all(
    sheetCharacters.map(({ characterName, realm }) =>
      getBlizzardCharacter({ token, characterName, realm })
    )
  );
  const filteredBlizzardCharacters = blizzardCharacters.filter(
    (character) => character.code !== 404
  );

  const storedRecords = await storeCharactersLevel(filteredBlizzardCharacters);

  return new Response(JSON.stringify({ storedRecords }));
}
