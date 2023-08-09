const shas = [
  "0xf212f66061cf1555160f4c135c7d1ce439be73e4e8012ebb806e53ef0d0af048",
  "0xee60066a8b3649fae7979fe50a124296327c6a82ecc1fc0ec4558f54a349b3bb",
  "0xeba24a01c205260cf1a29c51747d52731815013fa5d7b908c4a1264772e2a287",
];

const result = await fetch(
  "https://api.ethscriptions.com/api/ethscriptions/exists_multi",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shas),
  }
).then((x) => x.json());

console.log(result);
