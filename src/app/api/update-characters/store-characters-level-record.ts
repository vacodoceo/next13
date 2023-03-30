import { gql } from "@apollo/client";
import { NHostClient } from "../clients/nhost-client";
import { Character } from "./types/character";

export const storeCharactersLevelRecord = async (characters: Character[]) => {
  const nHostClient = await NHostClient.getInstance();

  const levelRecords = characters.map((character) => ({
    characterId: character.id,
    level: character.level,
  }));

  const INSERT_LEVEL_RECORDS = gql`
    mutation InsertLevelRecords($levelRecords: [LevelRecords_insert_input!]!) {
      insert_LevelRecords(objects: $levelRecords) {
        affected_rows
        returning {
          id
          characterId
          level
          timestamp
        }
      }
    }
  `;

  const storedLevelRecord = await nHostClient.graphql.request(
    INSERT_LEVEL_RECORDS,
    { levelRecords }
  );

  return storedLevelRecord;
};
