import { gql } from "@apollo/client";
import { NhostClient } from "@nhost/nhost-js";

const nhost = new NhostClient({
  subdomain: process.env.NHOST_SUBDOMAIN as string,
  region: process.env.NHOST_REGION as string,
});

const storeCharacterLevel = async ({
  id,
  level,
}: {
  id: string;
  level: number;
}) => {
  const timestamp = new Date().toISOString();
  const LEVEL_REGISTRY = gql`
    mutation InsertLevelRegistry(
      $id: bigint!
      $level: smallint!
      $timestamp: timestamp!
    ) {
      insert_LevelRegistry_one(
        object: { id: $id, level: $level, timestamp: $timestamp }
      ) {
        id
        level
        timestamp
      }
    }
  `;

  const a = await nhost.graphql.request(LEVEL_REGISTRY, {
    id,
    level,
    timestamp,
  });

  console.log(a);
};

export const storeCharactersLevel = async (blizzardCharacters: any[]) => {
  await Promise.all(
    blizzardCharacters.map(({ id, level }) =>
      storeCharacterLevel({ id, level })
    )
  );
};
