export const getToken = async () => {
  const { BLIZZARD_CLIENT_ID, BLIZZARD_CLIENT_SECRET } = process.env;
  const authString = Buffer.from(
    `${BLIZZARD_CLIENT_ID}:${BLIZZARD_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch("https://us.battle.net/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${authString}`,
    },
    body: "grant_type=client_credentials",
  });

  const { access_token } = await response.json();

  return access_token;
};
