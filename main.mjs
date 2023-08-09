import fs from "node:fs/promises";
import pMap from "p-map";

const baseUrl = `https://raw.githack.com/proofxyz/moonbirds-assets/main/collection/png`;
const items = Array.from({ length: 10_000 })
  .fill(0)
  .map((_, index) => index);

let html = "";

await pMap(
  items,
  async (index) => {
    const imageBlob = await fetch(`${baseUrl}/${index}.png`).then((res) =>
      res.blob()
    );
    const arrBuffer = await imageBlob.arrayBuffer();
    const buf = Buffer.from(arrBuffer);

    console.log(index);

    const dataURI = `data:image/png;base64,${buf.toString("base64")}`;

    const div = `<div class="item" data-id="${index}"><img alt="Moonbird ${index}" loading="lazy" src="${dataURI}" style="width: 150px; height: 150px;"></div>`;
    // const div = `<div class="item" data-id="${index}"><img alt="Moonbird ${index}" src="https://api.github.com/repos/proofxyz/moonbirds-assets/contents/collection/png/${index}.png" style="width: 150px; height: 150px;"></div>`;
    html += div;
  },
  { concurrency: 100 }
).then(async () => {
  const indexHtml = await fs.readFile("./template.html", "utf-8");
  const newIndex = indexHtml.replace(
    `<div id="container"></div>`,
    `<div id="container">${html}</div>`
  );
  await fs.writeFile("./index.html", newIndex);
});
