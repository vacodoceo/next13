import { formatRealm } from "./format-realm";

export const getBlizzardCharacter = async ({
  characterName,
  realm,
  token,
}: {
  characterName: string;
  realm: string;
  token: string;
}) => {
  const lowerCaseCharacterName = characterName.toLowerCase();
  const realmSlug = formatRealm(realm);
  const url = `https://us.api.blizzard.com/profile/wow/character/${realmSlug}/${lowerCaseCharacterName}?namespace=profile-us&access_token=${token}`;
  const response = await fetch(url);

  const character = await response.json();

  return character;
};
