import { gql } from "@apollo/client";
import { NHostClient } from "../clients/nhost-client";
import { Character } from "./types/character";

export const storeCharacters = async (characters: Character[]) => {
  const nHostClient = await NHostClient.getInstance();

  const UPSERT_CHARACTERS = gql`
    mutation InsertLevelRecords($characters: [Characters_insert_input!]!) {
      insert_Characters(
        objects: $characters
        on_conflict: {
          constraint: Characters_pkey
          update_columns: [
            class
            completedQuests
            faction
            imageURL
            level
            levelerName
            name
            race
            realm
          ]
        }
      ) {
        affected_rows
        returning {
          id
          class
          completedQuests
          faction
          imageURL
          level
          levelerName
          name
          race
          realm
        }
      }
    }
  `;

  const storedCharacters = await nHostClient.graphql.request(
    UPSERT_CHARACTERS,
    { characters }
  );

  return storedCharacters;
};
