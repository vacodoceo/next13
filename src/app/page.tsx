import { CharacterGrid } from "@/components/character-grid";
import { SearchMenu } from "@/components/search-menu";
import SearchProvider from "@/context/search-provider";
import { gql } from "@apollo/client";
import { NHostClient } from "./api/clients/nhost-client";
import { CharacterWithLevelRecords } from "./api/update-characters/types/character";

async function getCharacters(): Promise<CharacterWithLevelRecords[]> {
  const nHostClient = await NHostClient.getInstance();

  const CHARACTERS = gql`
    query GetCharacters {
      Characters(order_by: { level: desc }) {
        LevelRecords {
          timestamp
          level
        }
        class
        completedQuests
        faction
        id
        imageURL
        level
        levelerName
        name
        race
        realm
      }
    }
  `;

  const response = await nHostClient.graphql.request(CHARACTERS);
  console.info({ response });

  const { data } = response;
  const { Characters: characters } = data;

  return characters;
}

const Home = async () => {
  const characters = await getCharacters();

  return (
    <main className="mx-auto max-w-screen-lg space-y-8">
      <SearchProvider>
        <SearchMenu />
        <CharacterGrid characters={characters} />
      </SearchProvider>
    </main>
  );
};

export default Home;
